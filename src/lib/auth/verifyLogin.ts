"use server";

import { z, ZodError } from "zod";
import { getUserByLogin, createUser } from "../repos/user";

const verifyLoginSchema = z.object({
  login: z.string(),
});

export async function verifyLogin(
  params: z.infer<typeof verifyLoginSchema>,
): Promise<
  | { loginExists: true }
  | { loginExists: false; secret: string }
  | { error: string }
> {
  const { login } = verifyLoginSchema.parse(params);

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
