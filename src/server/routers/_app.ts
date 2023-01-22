import { router } from "../trpc";

import { addressRouter } from "./address.routes";
import { userRouter } from "./user.routes";

export const appRouter = router({
  user: userRouter,
  address: addressRouter,
});

export type AppRouter = typeof appRouter;
