import { db } from "../db";

export interface Note {
  id: string;
  name: string;
  content: string;
  isPublic: boolean;
}

export function createNote({ storyId }: { storyId: string }) {
  return db.note.create({
    data: {
      storyId,
      name: "Untitled note",
      content: "",
      isPublic: false,
    },
  });
}

export function updateNote({
  id,
  name,
  isPublic,
  content,
}: {
  id: string;
  name?: string;
  isPublic?: boolean;
  content?: string;
}) {
  return db.note.update({
    where: { id },
    data: { isPublic, content, name },
  });
}

export function deleteNote({ id }: { id: string }) {
  return db.note.delete({
    where: { id },
  });
}
