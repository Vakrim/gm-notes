import { db } from "../db";

export function getStoriesOfUser(userId: string) {
  return db.story.findMany({
    where: {
      userId,
    },
  });
}
