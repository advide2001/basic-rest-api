import { string } from "zod";
import sessionModel from "../models/session.model";
import UserModel from "../models/user.models";
import { omit } from "lodash";

export async function createSession(userId: string, userAgent: string) {
  const session = await sessionModel.create({
    user: userId,
    userAgent,
  });

  return session.toJSON();
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });
  if (!user) return false;

  const isValid = await user.comparePasswords(password);

  if (!isValid) return false;
  return omit(user, "password");
}
