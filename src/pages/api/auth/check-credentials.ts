// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { hashPassword } from "@src/lib/encryption/hashPassword";
import { isSamePassword } from "@src/lib/encryption/isSamePassword";
import prisma from "@src/lib/prisma";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestData = {
  email: string;
  password: string;
  csrfToken: string;
};

// 1. Check if POST request
// 2. Check if CSRF token is valid
// 3. Check if user exists
// 4. Check if password is correct
// 5. Return user data

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed", success: false });

  console.log("request received :", req.body);
  const { email, password } = req.body as RequestData;

  console.log("email :", email);

  const psUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!psUser) {
    return res.status(200).json({ error: "User not found", success: false });
  }
  const isSame = await isSamePassword(password, psUser.password);

  if (!isSame) {
    return res
      .status(200)
      .json({ error: "Invalid credentials", success: false });
  }

  const user = {
    id: psUser.id,
    email: psUser.email,
  };

  res.status(200).json({ user, success: true });
}
