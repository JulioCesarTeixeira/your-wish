import { z } from "zod";

export enum EProductAvailability {
  IN_STOCK,
  OUT_OF_STOCK,
  PRE_ORDER
}
export type ProductAvailability = keyof typeof EProductAvailability;

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  categories: z.string().array(),
  image: z.string().optional(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
  availability: z.nativeEnum(EProductAvailability),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type Product = z.infer<typeof productSchema>;

export const productsSchema = z.array(productSchema);

export type Products = z.infer<typeof productsSchema>;

export const productInputSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string().optional(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }).optional(),
});

export type ProductInput = z.infer<typeof productInputSchema>;

export const productUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
});

export type ProductUpdate = z.infer<typeof productUpdateSchema>;

export const productDeleteSchema = z.object({
  id: z.string(),
});

export type ProductDelete = z.infer<typeof productDeleteSchema>;



// export const productRatingSchema = z.object({
//   id: z.string(),
//   rating: z.object({
//     rate: z.number(),
//     count: z.number(),
//   }),
// });

// export type ProductRating = z.infer<typeof productRatingSchema>;

// export const productRatingInputSchema = z.object({
//   id: z.string(),
//   rating: z.object({
//     rate: z.number(),
//     count: z.number(),
//   }),
// });

// export type ProductRatingInput = z.infer<typeof productRatingInputSchema>;

