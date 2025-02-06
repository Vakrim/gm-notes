"use server";

import { redirect } from "next/navigation";
import * as stories from "../../repos/stories";
import { z } from "zod";

const deleteStorySchema = z.object({
  storyId: z.string(),
});

export async function deleteStory(params: z.infer<typeof deleteStorySchema>) {
  const { storyId } = deleteStorySchema.parse(params);

  await stories.deleteStory({ storyId });

  redirect("/stories");
}
