import { Drawer } from '../drawer'
import getEnv from '../getEnv';
import { Controller } from '../types';

export const login: Controller = (ctx, next) => {
  const newUser = new Drawer(
    getEnv('email'),
    getEnv('password'),
    process.env['public_folder']
  )
  newUser.registerToStore()

  ctx.body = {
    message: 'Successfully Logged in'
  }
}
