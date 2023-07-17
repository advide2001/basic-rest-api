import { object, string } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "email is required",
    }).email({ message: "Invalid email address" }),

    password: string({ required_error: "password is required" }),
  }),
});
