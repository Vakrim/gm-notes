import { db } from "../db";
import { isPresent } from "../isPresent";
import { createAuthorizationFunction } from "./createAuthorizationFunction";

export const canEditNote = createAuthorizationFunction<string>(
  async (user, noteId) => {
    return isPresent(
      await db.note.findFirst({
        where: {
          id: noteId,
          story: {
            userId: user.id,
          },
        },
      }),
    );
  },
);
