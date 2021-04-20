import { Drawer } from '../drawer'
import getEnv from '../getEnv';
import { Controller } from '../types';

export const loginWithEnvInfo = () => {
  const newUser = new Drawer(
    getEnv('email'),
    getEnv('password'),
    process.env['public_folder']
  )
  newUser.registerToStore()
}

export const login: Controller = (ctx, next) => {
  loginWithEnvInfo()
  ctx.body = {
    message: 'Successfully Logged in'
  }
}
