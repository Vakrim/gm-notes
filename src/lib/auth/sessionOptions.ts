import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long", // TODO
  cookieName: "gm-notes-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
