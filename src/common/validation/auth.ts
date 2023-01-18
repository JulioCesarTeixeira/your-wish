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

// type for personal information
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z
    .string()
    .min(2, { message: "State must be at least 2 characters" })
    .optional(),
  zip: z.string().min(5, { message: "Zip code must be at least 5 characters" }),
});

export type IPersonalInfo = z.infer<typeof personalInfoSchema>;
