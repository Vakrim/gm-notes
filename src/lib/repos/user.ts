import { randomBytes } from "crypto";
import { db } from "../db";

export const getUserByLogin = async (login: string) => {
  return await db.user.findUnique({
    where: {
      login,
    },
  });
};

export const createUser = async (login: string) => {
  const OTPSecret = generateBase32Secret(32);

  return await db.user.create({
    data: {
      login,
      OTPSecret,
    },
  });
};

function generateBase32Secret(length: number) {
  const bytes = randomBytes(length);
  let secret = "";
  for (let i = 0; i < bytes.length; i++) {
    secret += base32Chars[bytes[i] % 32];
  }
  return secret;
}

const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
