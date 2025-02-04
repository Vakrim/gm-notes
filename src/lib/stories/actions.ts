"use server";

import { getAuthenticatedSession } from "../auth/getSession";
import { getStoriesOfUser, getStory as queryStory } from "../repos/stories";

export async function getMyStories() {
  const session = await getAuthenticatedSession();

  return getStoriesOfUser(session.id);
}

export async function getStory(storyId: string) {
  return queryStory(storyId);
}
