"use server";

import * as stories from "../../repos/stories";

export async function getStory(storyId: string) {
  return stories.getStory({ storyId });
}
