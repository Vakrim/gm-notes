"use server";

import { ZodError } from "zod";
import { getUserByLogin, createUser } from "../repos/user";

export async function verifyLogin({
  login,
}: {
  login: string;
}): Promise<
  | { loginExists: true }
  | { loginExists: false; secret: string }
  | { error: string }
> {
  const user = await getUserByLogin(login);

  if (user) {
    return { loginExists: true };
  }

  const newUser = await createUser(login);

  if (newUser instanceof ZodError) {
    return { error: newUser.message };
  }

  return { loginExists: false, secret: newUser.OTPSecret };
}
