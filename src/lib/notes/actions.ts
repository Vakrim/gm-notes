"use server";

import { revalidatePath } from "next/cache";
import * as notes from "../repos/notes";
import { z } from "zod";

const noteIdSchema = z.object({
  noteId: z.string(),
});

export async function markNoteAsPublic(params: z.infer<typeof noteIdSchema>) {
  const { noteId } = noteIdSchema.parse(params);

  const note = await notes.updateNote({
    id: noteId,
    isPublic: true,
  });

  revalidatePath(`/stories/${note.storyId}/notes`);
}

export async function markNoteAsPrivate(params: z.infer<typeof noteIdSchema>) {
  const { noteId } = noteIdSchema.parse(params);

  const note = await notes.updateNote({
    id: noteId,
    isPublic: false,
  });

  revalidatePath(`/stories/${note.storyId}/notes`);
}

const updateNoteNameSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export async function updateNoteName(
  params: z.infer<typeof updateNoteNameSchema>,
) {
  const { id, name } = updateNoteNameSchema.parse(params);

  const note = await notes.updateNote({
    id,
    name,
  });

  revalidatePath(`/stories/${note.storyId}/notes`);
}

const updateNoteContentSchema = z.object({
  id: z.string(),
  content: z.string(),
});

export async function updateNoteContent(
  params: z.infer<typeof updateNoteContentSchema>,
) {
  const { id, content } = updateNoteContentSchema.parse(params);

  const note = await notes.updateNote({
    id,
    content,
  });

  revalidatePath(`/stories/${note.storyId}/notes`);
}

const createNoteSchema = z.object({
  storyId: z.string(),
});

export async function createNote(params: z.infer<typeof createNoteSchema>) {
  const { storyId } = createNoteSchema.parse(params);

  await notes.createNote({
    storyId,
  });

  revalidatePath(`/stories/${storyId}/notes`);
}

export async function removeNote(params: z.infer<typeof noteIdSchema>) {
  const { noteId: id } = noteIdSchema.parse(params);

  const note = await notes.deleteNote({
    id,
  });

  revalidatePath(`/stories/${note.storyId}/notes`);
}
