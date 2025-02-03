import { assertValid } from "../src/lib/assertValid";
import { db } from "../src/lib/db";
import { createUser } from "../src/lib/repos/user";

async function main() {
  const user = await createUser("alice");
  assertValid(user);

  const story = await db.story.create({
    data: {
      name: "My first story",
      userId: user.id,
    },
  });

  await db.note.createMany({
    data: [
      {
        name: "My first note",
        content: "This is my first note",
        storyId: story.id,
      },
      {
        name: "My second note",
        content: "This is my second note",
        storyId: story.id,
      },
    ],
  });
}

await main();
