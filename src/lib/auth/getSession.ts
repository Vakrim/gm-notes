import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./sessionOptions";

export interface SessionData {
  data: CurrentUser | null;
}

export interface CurrentUser {
  id: string;
  login: string;
}

export async function getSessionWithMeta() {
  return await getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function getSession() {
  const session = await getSessionWithMeta();

  return session.data ?? null;
}

export async function getAuthenticatedSession() {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}
