import { router } from "../trpc";
import { z } from "zod";
import { createContext } from "../context";

import { userRouter } from "./user";

const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
