import { db } from "../db";

export function getStoriesOfUser(userId: string) {
  return db.story.findMany({
    where: {
      userId,
    },
  });
}

export function getStory(storyId: string) {
  return db.story.findUnique({
    where: {
      id: storyId,
    },
    include: {
      notes: true,
    },
  });
}
