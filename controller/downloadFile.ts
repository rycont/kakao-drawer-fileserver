import { findUser } from "../drawer";
import { Controller } from "../types";

export const downloadFile: Controller = async (ctx) => {
  const fildId = ctx.params.id
  const user = findUser()
  const fetched = await user.downloadFile(fildId)

  const buf = await (await fetched.fetch).buffer()
  ctx.set('Content-disposition', `attachment; filename=${encodeURI(fetched.file.originalFileName)}`)
  ctx.body = buf
}