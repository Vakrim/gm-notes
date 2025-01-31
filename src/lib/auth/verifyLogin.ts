"use server";

import { getUserByLogin, createUser } from "../repos/user";

export async function verifyLogin({
  login,
}: {
  login: string;
}): Promise<{ loginExists: true } | { loginExists: false; secret: string }> {
  const user = await getUserByLogin(login);

  if (user) {
    return { loginExists: true };
  }

  const newUser = await createUser(login);

  return { loginExists: false, secret: newUser.OTPSecret };
}
