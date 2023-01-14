// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { hashPassword } from "@src/lib/encryption/hashPassword";
import prisma from "@src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestData = {
  credentials: Record<"email" | "password", string> | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("request received :", req.body);
  try {
    const { credentials } = req.body as RequestData;
    const { hash } = await hashPassword(credentials?.password ?? "");

    const psUser = await prisma.user.create({
      data: {
        email: credentials?.email,
        password: hash,
      },
    });

    const { email, id } = psUser;
    const user = {
      userId: id,
      email: email,
    };

    return res.status(200).json({ user });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
