import mongoose from "mongoose";
import { UserDocument } from "./user.models";

export interface sessionInput {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
}

export interface sessionDocument extends sessionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const sessionModel = mongoose.model("Session", sessionSchema);

export default sessionModel;
