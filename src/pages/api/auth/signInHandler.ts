// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type RequestData = {
  credentials: Record<"username" | "password", string> | undefined
}

type ResponseData = {
  userId: number;
  email: string;
  name: string;
  isEmailVerified: boolean;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log("request received :", req.body)
  const {credentials} = req.body as RequestData
  const user = {
    userId: 1,
    email: credentials?.username ?? "johndoe@gmail.com",
    name: "John Doe",
    isEmailVerified: true,
  }
  res.status(200).json(user)
}
