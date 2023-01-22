import { Role } from "@prisma/client";

export type AuthUser = {
  id: string;
  email: string | null;
  name: string | null;
  isEmailVerified: Date | null;
  role: Role;
  createdAt?: Date;
};
