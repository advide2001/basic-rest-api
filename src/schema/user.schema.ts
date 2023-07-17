import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),

    password: string({
      required_error: "password is required",
    }).min(6, "password to short - should be 6 characters"),

    passwordConfirmation: string({
      required_error: "password confirmation is required",
    }),

    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
  }).refine((data) => (data.password = data.passwordConfirmation), {
    message: "passwords do not match!!",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
