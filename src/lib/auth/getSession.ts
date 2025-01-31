import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./sessionOptions";

export interface SessionData {
  data: {
    id: string;
    login: string;
  } | null;
}

export async function getSessionWithMeta() {
  return await getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function getSession() {
  const session = await getSessionWithMeta();

  return session.data ?? null;
}
