"use server";

import { getAuthenticatedSession } from "../../auth/getSession";
import * as stories from "../../repos/stories";

export async function getMyStories() {
  const session = await getAuthenticatedSession();

  return stories.getStoriesOfUser(session.id);
}
