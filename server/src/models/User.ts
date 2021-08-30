import { Schema, model } from "mongoose";
import { User } from "types";

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const UserModel = model<User>("user", UserSchema);
