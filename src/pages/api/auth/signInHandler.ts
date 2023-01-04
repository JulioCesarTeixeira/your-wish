// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { hashPassword } from "@/src/lib/encryption/hashPassword";
import { isSamePassword } from "@/src/lib/encryption/isSamePassword";
import prisma from "@/src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestData = {
  email: string;
  password: string;
  csrfToken: string;
};

type ResponseData = {
  userId: number;
  email: string;
  name: string;
  isEmailVerified: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("request received :", req.body);
  const { email, password, csrfToken } = req.body as RequestData;

  const psUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!psUser) {
    return res.status(404).json({ error: "User not found" });
  }
  const isSame = await isSamePassword(password, psUser.password);

  if (!isSame) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const { id } = psUser;

  const user = {
    userId: id,
    email: psUser.email,
  };

  res.status(200).json(user);
}
