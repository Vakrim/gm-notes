import { db } from "../db";

export interface Note {
  id: string;
  name: string;
  content: string;
  isPublic: boolean;
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
