"use server";

import { revalidatePath } from "next/cache";
import * as notes from "../repos/notes";

export async function markNoteAsPublic(id: string) {
  const note = await notes.updateNote({
    id,
    isPublic: true,
  });

  revalidatePath(`/stories/${note.storyId}/notes`);
}

export async function markNoteAsPrivate(id: string) {
  const note = await notes.updateNote({
    id,
    isPublic: false,
  });

  revalidatePath(`/stories/${note.storyId}/notes`);
}

export async function updateNoteName({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const note = await notes.updateNote({
    id,
    name,
  });

  revalidatePath(`/stories/${note.storyId}/notes`);
}

export async function updateNoteContent({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  const note = await notes.updateNote({
    id,
    content,
  });

  revalidatePath(`/stories/${note.storyId}/notes`);
}

export async function createNote(storyId: string) {
  await notes.createNote({
    storyId,
  });

  revalidatePath(`/stories/${storyId}/notes`);
}

export async function removeNote({ id }: { id: string }) {
  const note = await notes.deleteNote({
    id,
  });

  revalidatePath(`/stories/${note.storyId}/notes`);
}
