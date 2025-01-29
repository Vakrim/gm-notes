import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

async function seedNotes() {
  if ((await db.note.count()) > 0) {
    return;
  }

  await db.note.createMany({
    data: [
      {
        name: "My first note",
        content: "This is my first note",
        isPublic: true,
      },
      {
        name: "My second note",
        content: "This is my second note",
        isPublic: false,
      },
      {
        name: "My third note",
        content: "This is my third note",
        isPublic: true,
      },
    ],
  });
}

await seedNotes();
