import { Document } from "mongoose";

export default interface IPost extends Document {
  author: string;
  title: string;
  body: string;
  published: boolean;
  date: number;
}
