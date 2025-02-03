"use server";

import { getAuthenticatedSession } from "../auth/getSession";
import { getStoriesOfUser } from "../repos/stories";

export async function getAllStories() {
  const session = await getAuthenticatedSession();

  return getStoriesOfUser(session.id);
}
