"use server";

import { createUser, getUserByLogin } from "../repos/user";
import { TOTP } from "totp-generator";
import { redirect } from "next/navigation";
import { getSessionWithMeta } from "./getSession";

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

export async function signIn({ login, otp }: { login: string; otp: string }) {
  const user = await getUserByLogin(login);

  if (!user) {
    throw new Error("User not found");
  }

  const isVerified = TOTP.generate(user.OTPSecret).otp === otp;

  if (!isVerified) {
    throw new Error("Invalid OTP");
  }

  const session = await getSessionWithMeta();

  session.data = {
    id: user.id,
    login: user.login,
  };

  await session.save();

  redirect("/");
}

export async function logout() {
  const session = await getSessionWithMeta();
  session.destroy();

  redirect("/");
}
