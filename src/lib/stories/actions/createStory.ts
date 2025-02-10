"use server";

import { redirect } from "next/navigation";
import { getAuthenticatedSession } from "../../auth/getSession";
import * as stories from "../../repos/stories";

export async function createStory() {
  const session = await getAuthenticatedSession();

  const story = await stories.createNewStory({ userId: session.id });

  redirect(`/stories/${story.id}/notes`);
}
