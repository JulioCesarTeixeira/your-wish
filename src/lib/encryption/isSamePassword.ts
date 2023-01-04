import bcrypt from "bcrypt";

export async function isSamePassword(
  password?: string,
  hash?: string | null
): Promise<boolean> {
  if (!password || !hash) return false;
  const isSame = await bcrypt.compare(password, hash);

  return isSame;
}
