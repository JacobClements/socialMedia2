import { Timestamp } from "rxjs";

export interface Post {
  userID?: string,
  postId?: string,
  title?: string,
  description?: string,
  date?: string
}