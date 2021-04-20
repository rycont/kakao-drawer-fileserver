import Koa from 'koa'
import Router from 'koa-router'
import { downloadFile } from './controller/downloadFile'
import { getPublicFileList } from './controller/getFileList'
import { getFileInfo } from './controller/getFileInfo'
import { login, loginWithEnvInfo } from './controller/login'

const app = new Koa()
const rootRouter = new Router()

rootRouter.get('/login', login)
rootRouter.get('/file/:fileId', getFileInfo)
rootRouter.get('/file', getPublicFileList)
rootRouter.get('/download/:id', downloadFile)

app.use(rootRouter.routes())
app.use(rootRouter.allowedMethods())

const port = process.env['PORT'] || 8080

app.listen(port, () => {
  console.log('Drawer CDN is listening on port ' + port)
  loginWithEnvInfo()
})
