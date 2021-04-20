import { findUser } from "../drawer";
import { Controller } from "../types";

export const getFileInfo: Controller = async (ctx) => {
  const { fileId } = ctx.params
  const user = findUser()

  ctx.body = await user.findFile(fileId)
}