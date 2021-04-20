**본 소스코드를 사용함으로써 생기는 모든 불이익은 이용자에게 있으며, 개발자는 어떤 책임도 지지 않음을 안내합니다**

# 파일서버로써의 톡서랍, Kakao Drawer as File Server

~~줄여서 파서랍~~

300GB를 알차게 사용해봅시다, 파일서버로써로요.

# 시작하기, How to start

1. `.env` 파일을 채워주세요.

```
email=카카오 이메일
password=카카오 비밀번호
public_folder=공개할 폴더. 비워두면 "모든 파일 목록"이 표시됩니다.
port=서버 포트 번호. 기본값은 7667입니다.
```

2. npm 의존성을 설치해주세요. `yarn` or `npm i`
3. 서버를 실행해주세요. `yarn start` or `npm run start`
4. 커맨드라인에 표시되는 안내에 따라 로그인 절차를 밟아주세요.

# 사용하기, How to use

## /login

.env파일에 작성한 정보를 바탕으로 카카오계정에 로그인합니다.
일반적인 상황이라면 사용하지 않습니다.
(서버 시작시 자동으로 로그인 됨)

## /file

`-> File[]`

public_folder에 작성한 폴더의 파일 목록을 반환합니다.

## /file/:fileId

`-> File`

파일의 상세 정보를 반환합니다.

## /download/:fileId

`-> 파일 다운로드`

public_folder에 작성한 폴더에서 id가 `fileId`인 파일을 다운로드합니다.

# Type

## File

파일의 정보를 나타내는 객체입니다.

```
interface File {
  id: string;
  bookmarked: boolean;
  chatId: number;
  contentLogId: number;
  drawerId: number;
  joined: boolean;
  createdAt: number;
  updatedAt: number;
  authorId: number;
  contentType: string;
  kageToken: string;
  url: string;
  originalFileName: string;
  mimeType: string;
  size: number;
  downloadableUrl?: string;
}
```
