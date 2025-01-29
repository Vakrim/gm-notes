import { db } from "../db";
import { sanitizeNoteContent } from "../sanitizeNoteContent";

export interface Note {
  id: string;
  name: string;
  content: string;
  isPublic: boolean;
}

export function getAllNotes() {
  return db.note.findMany({
    select: {
      id: true,
      name: true,
      content: true,
      isPublic: true,
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
  if (content !== undefined) {
    content = sanitizeNoteContent(content);
  }

  return db.note.update({
    where: { id },
    data: { isPublic, content, name },
  });
}
