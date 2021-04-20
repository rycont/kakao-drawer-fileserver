import { AuthApiClient, ServiceApiClient } from 'node-kakao'
import fetch, { Headers } from 'node-fetch'
import readlineAsync from 'readline';
import { stdin } from 'process';
import { File } from '../types';

export const users: Record<string, Drawer> = {}

async function readline(question: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let rl = readlineAsync.createInterface({
      input: stdin
    });
    console.log(question)
    rl.question(question, (answer) => {
      resolve(answer)
      rl.close()
    })
  });
}

export class Drawer {
  cookie?: string
  email: string
  publicFolder?: string

  constructor(email: string, password: string, publicFolder?: string) {
    this.email = email
    this.publicFolder = publicFolder
    this.login(email, password)
      .then(cookie => this.cookie = cookie)
      .catch(e => console.log(e))
  }

  async login(email: string, password: string): Promise<string> {
    const api = await AuthApiClient.create('driver', 'driver')

    const loginform = {
      email,
      password,
      forced: true
    }

    let loginRequest = await api.login(loginform)
    console.log(loginform.email, '계정으로 로그인을 시도합니다.')
    while (!loginRequest.success) {
      await api.requestPasscode(loginform)
      const passcode = await readline('전송된 인증번호를 입력해주세요');
      const requestRegister = await api.registerDevice(loginform, passcode, true)

      if (!requestRegister.success) {
        console.log(`인증에 실패했습니다 : ${requestRegister.status}`)
        break;
      }

      console.log('인증에 성공했습니다.');
      loginRequest = await api.login(loginform)
    }

    if (!loginRequest.success) throw new Error("로그인에 문제가 발생했습니다.")

    console.log('로그인에 성공했습니다.')
    const service = await ServiceApiClient.create(loginRequest.result)
    const fetchedUrl = await service.requestSessionURL('https://drive.kakao.com/')
    if (!fetchedUrl.success) {
      throw new Error('톡서랍에 접근하지 못했어요.')
    }

    const fetchedDrive = await fetch(fetchedUrl.result, {
      redirect: 'manual'
    })

    const cookies = (new Map(Object.entries(
      Object.fromEntries(
        fetchedDrive.headers
          .get('set-cookie')!
          .split(/, (?=[^0-9])/)
          .map(coo => coo.split('; ')[0].split('='))
      )
    )))
    return `_kawlt=${cookies.get('_kawlt')}`
  }

  async getPublicFileList() {
    if (!this.cookie) throw new Error("Not logged in yet")
    const uri = this.publicFolder ?
      `https://drawer-api.kakao.com/folder/${this.publicFolder}/content/list?verticalType=FILE&fetchCount=100`
      : `https://drawer-api.kakao.com/mediaFile/list?verticalType=FILE&fetchCount=100`

    const files = (await (await fetch(uri, {
      headers: new Headers({
        Cookie: this.cookie
      })
    })).json()) as { items: File[] }
    console.log(files)
    return files.items
  }

  registerToStore() {
    users[this.email] = this
  }

  async downloadFile(requestedId: string) {
    if (!this.cookie) throw new Error("Not logged in yet")
    const foundFile = (await this.getPublicFileList()).find(file => file.id === requestedId)
    if (!foundFile) throw new Error(`File not found : ${requestedId}`)

    return {
      fetch: fetch(foundFile.url, {
        headers: new Headers({
          Cookie: this.cookie
        })
      }),
      file: foundFile
    }
  }
}

export const findUser = (email?: string) => {
  const userList = Object.values(users)
  if (userList.length === 1) return userList[0]

  if (!email) throw new Error("Not enough info to find user");
  return users[email]

}
