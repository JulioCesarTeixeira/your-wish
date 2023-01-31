import { router } from "../trpc";

import { addressRouter } from "./address.routes";
import { productRouter } from "./product.routes";
import { userRouter } from "./user.routes";

export const appRouter = router({
  user: userRouter,
  address: addressRouter,
  products: productRouter,
});

export type AppRouter = typeof appRouter;
