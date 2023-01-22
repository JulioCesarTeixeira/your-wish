import * as z from "zod";

// Define the schema for the login and sign up forms
// This is used to validate the data before sending it to the API
// and also to type the data returned from the API
export const loginSchema = z.object({
  email: z.string({ required_error: "Field is required" }).email(),
  password: z
    .string()
    .min(4, {
      message: "Your password must have at least 4 letters/symbols/numbers",
    })
    .max(12, {
      message: "Your password must not have more than 12 characters",
    })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message:
        "Your password must include at least one letter, one number and one special symbol",
    }),
  rememberMe: z.boolean().default(false),
});

export const signUpSchema = loginSchema;

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
