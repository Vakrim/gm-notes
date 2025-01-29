"use server";

import { revalidatePath } from "next/cache";
import { updateNote } from "./notes";

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

export async function updateNoteNameAndContent({
  id,
  name,
  content,
}: {
  id: string;
  name: string;
  content: string;
}) {
  await updateNote({
    id,
    name,
    content,
  });

  revalidatePath("/notes");
}
