import * as trpcNext from "@trpc/server/adapters/next";

import { createContext } from "../../../server/context";
import { appRouter } from "@src/server/routers/_app";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    console.error(error);
    return {
      message: error.message,
      code: error.code,
    };
  },
});
