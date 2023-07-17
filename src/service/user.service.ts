import { omit } from "lodash";
import UserModel, { UserInput } from "../models/user.models";

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);
    return omit(user, "password");
  } catch (e: any) {
    throw new Error(e);
  }
}
