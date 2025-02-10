import { db } from "../db";

export function getStoriesOfUser(userId: string) {
  return db.story.findMany({
    where: {
      userId,
    },
  });
}

export function createNewStory({ userId }: { userId: string }) {
  return db.story.create({
    data: {
      userId,
      name: "Untitled story",
    },
  });
}

export function getStory({ storyId }: { storyId: string }) {
  return db.story.findUnique({
    where: {
      id: storyId,
    },
    include: {
      notes: true,
    },
  });
}

export function getPublicStory({ storyId }: { storyId: string }) {
  return db.story.findUnique({
    where: {
      id: storyId,
    },
    include: {
      notes: {
        where: {
          isPublic: true,
        },
      },
    },
  });
}

export function deleteStory({ storyId }: { storyId: string }) {
  return db.story.delete({
    where: { id: storyId },
  });
}
