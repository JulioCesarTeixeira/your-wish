import * as z from "zod";

// Define the schema for the login and sign up forms
// This is used to validate the data before sending it to the API
// and also to type the data returned from the API
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export const signUpSchema = loginSchema;

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
