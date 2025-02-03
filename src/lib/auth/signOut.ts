"use server";

import { redirect } from "next/navigation";
import { getSessionWithMeta } from "./getSession";

export async function signOut() {
  const session = await getSessionWithMeta();
  session.destroy();

  redirect("/");
}
