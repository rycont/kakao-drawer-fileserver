import { config } from 'dotenv'
config()

export const getEnv = (key: string): string => {
  if (process.env.hasOwnProperty(key)) return process.env[key]!!
  throw new Error(`Cannot find key "${key}" from env`);
}

export default getEnv
