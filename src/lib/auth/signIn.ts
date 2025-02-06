"use server";

import { getUserByLogin } from "../repos/user";
import { TOTP } from "totp-generator";
import { redirect } from "next/navigation";
import { getSessionWithMeta } from "./getSession";
import { z } from "zod";

const signInSchema = z.object({
  login: z.string(),
  otp: z.string(),
});

export async function signIn(params: z.infer<typeof signInSchema>) {
  const { login, otp } = signInSchema.parse(params);

  const user = await getUserByLogin(login);

  if (!user) {
    throw new Error("User not found");
  }

  const isVerified = TOTP.generate(user.OTPSecret).otp === otp;

  if (!isVerified) {
    return { error: "Invalid OTP" };
  }

  const session = await getSessionWithMeta();

  session.data = {
    id: user.id,
    login: user.login,
  };

  await session.save();

  redirect("/");
}
