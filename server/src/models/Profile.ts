import { Schema, model } from "mongoose";
import { Profile } from "types";

// create schema
const ProfileSchema = new Schema<Profile>({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  handle: { type: String, required: true, max: 40 },
  bio: { type: String },
  age: { type: String },
  job: { type: String },
});

export const ProfileModel = model<Profile>("profile", ProfileSchema);
