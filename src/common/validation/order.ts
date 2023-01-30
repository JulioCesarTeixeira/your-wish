import { z } from "zod";

export const orderSchema = z.object({
  id: z.string(),
  user: z.string(),
  orderItems: z.string().array(),
  shippingAddress: z.string(),
  paymentMethod: z.string(),
  itemsPrice: z.number(),
  taxPrice: z.number(),
  shippingPrice: z.number(),
  totalPrice: z.number(),
  isPaid: z.boolean(),
  paidAt: z.date().optional(),
  isDelivered: z.boolean(),
  deliveredAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type Order = z.infer<typeof orderSchema>;