import { db } from "../db";
import { isPresent } from "../isPresent";
import { createAuthorizationFunction } from "./createAuthorizationFunction";

export const isStoryOwner = createAuthorizationFunction<string>(
  async (user, storyId) => {
    return isPresent(
      await db.story.findFirst({
        where: {
          id: storyId,
          userId: user.id,
        },
      }),
    );
  },
);

export const canEditStory = isStoryOwner;

export const canSeeStory = isStoryOwner;
