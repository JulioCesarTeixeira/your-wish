import { z } from "zod";

export const addressSchema = z.object({
  id: z.string().optional(),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters" }),
  street: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z
    .string()
    .min(2, { message: "State must be at least 2 characters" })
    .optional(),
  zip: z.string().min(3, { message: "Zip code must be at least 3 characters" }),
});

export type IAddress = z.infer<typeof addressSchema>;

// type for personal information
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  contactEmail: z.string().email(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .optional(),
});

export type IPersonalInfo = z.infer<typeof personalInfoSchema>;
