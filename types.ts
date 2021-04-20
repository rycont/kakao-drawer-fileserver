import { Context, Next } from 'koa'

export type Controller = (ctx: Context, next: Next) => unknown;

export interface File {
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
}

export interface DownloadableFile extends File {
  downloadableUrl: string;
}
