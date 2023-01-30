import { z } from "zod";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type Category = z.infer<typeof categorySchema>


export const categoriesSchema = z.array(categorySchema);

export type Categories = z.infer<typeof categoriesSchema>;

export const categoryInputSchema = z.object({
  name: z.string(),
  description: z.string(),
});
