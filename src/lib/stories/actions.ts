"use server";

import { redirect } from "next/navigation";
import { getAuthenticatedSession } from "../auth/getSession";
import * as stories from "../repos/stories";

export async function getMyStories() {
  const session = await getAuthenticatedSession();

  return stories.getStoriesOfUser(session.id);
}

export async function getStory(storyId: string) {
  return stories.getStory({ storyId });
}

export async function createStory() {
  const session = await getAuthenticatedSession();

  const story = await stories.createNewStory({ userId: session.id });

  redirect(`/stories/${story.id}/notes`);
}

export async function deleteStory(storyId: string) {
  await stories.deleteStory({ storyId });

  redirect("/stories");
}
