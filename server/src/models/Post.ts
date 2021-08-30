import { Schema, model } from "mongoose";
import { Post } from "types";

const PostSchema = new Schema<Post>({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  text: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  likes: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
    },
  ],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
      text: { type: String, required: true },
      name: { type: String },
      avatar: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  date: { type: Date, default: Date.now },
});

export const PostModel = model<Post>("post", PostSchema);
