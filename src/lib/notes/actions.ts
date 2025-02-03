"use server";

import { revalidatePath } from "next/cache";
import { updateNote } from "../repos/notes";

export async function markNoteAsPublic(id: string) {
  await updateNote({
    id,
    isPublic: true,
  });

  revalidatePath("/notes");
}

export async function markNoteAsPrivate(id: string) {
  await updateNote({
    id,
    isPublic: false,
  });

  revalidatePath("/notes");
}

export async function updateNoteName({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  await updateNote({
    id,
    name,
  });

  revalidatePath("/notes");
}

export async function updateNoteContent({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  await updateNote({
    id,
    content,
  });

  revalidatePath("/notes");
}
