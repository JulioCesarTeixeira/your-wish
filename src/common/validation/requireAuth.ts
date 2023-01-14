import { paths } from "@src/constants/navigation";
import { authOptions } from "@src/pages/api/auth/[...nextauth]";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";

const { signIn } = paths;

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      authOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: signIn, // login path
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };
