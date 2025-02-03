import { SessionOptions } from "iron-session";

const password = process.env.SESSION_PASSWORD;

if (!password) {
  throw new Error("SESSION_PASSWORD environment variable is not set");
}

export const sessionOptions: SessionOptions = {
  password,
  cookieName: "gm-notes-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
