import { findUser } from "../drawer";
import { Controller } from "../types";

export const getPublicFileList: Controller = async (ctx) => {
  const user = findUser()
  const files = await user.getPublicFileList()
  ctx.body = files
}