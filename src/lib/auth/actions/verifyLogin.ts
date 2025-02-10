"use server";

import { z, ZodError } from "zod";
import { getUserByLogin, createUser } from "../../repos/user";
import {
  createResponseValidator,
  ValidResponse,
} from "../../createResponseValidator";

const verifyLoginSchema = z.object({
  login: z.string(),
});

const responseSchema = z.union([
  z.object({
    loginExists: z.literal(true),
  }),
  z.object({
    loginExists: z.literal(false),
    secret: z.string(),
  }),
  z.object({
    error: z.string(),
  }),
]);

const validateResponse = createResponseValidator(responseSchema);

export async function verifyLogin(
  params: z.infer<typeof verifyLoginSchema>,
): Promise<ValidResponse<typeof validateResponse>> {
  const { login } = verifyLoginSchema.parse(params);

  const user = await getUserByLogin(login);

  if (user) {
    return validateResponse({ loginExists: true });
  }

  const newUser = await createUser(login);

  if (newUser instanceof ZodError) {
    return validateResponse({ error: newUser.message });
  }

  return validateResponse({ loginExists: false, secret: newUser.OTPSecret });
}
