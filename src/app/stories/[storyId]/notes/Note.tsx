"use client";

import { useState } from "react";
import {
  markNoteAsPrivate,
  markNoteAsPublic,
  removeNote,
  updateNoteContent,
  updateNoteName,
} from "../../../../lib/notes/actions";
import { Note as NoteObject } from "../../../../lib/repos/notes";
import { textInput } from "../../../../lib/ui/tailwindClasses";
import clsx from "clsx";
import { TrashButton } from "../../../../lib/ui/TrashButton";

export const Note = ({ note }: { note: NoteObject }) => {
  const [name, setName] = useState(note.name);
  const [content, setContent] = useState(note.content);

  return (
    <div key={note.id} className="note card mb-4 flex flex-col gap-4">
      <div className="flex justify-between items-center gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={async () => {
            await updateNoteName({
              id: note.id,
              name,
            });
          }}
          className={clsx(textInput, "flex-grow")}
        />

        <TrashButton
          onClick={async () => {
            await removeNote({
              id: note.id,
            });
          }}
        />

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={note.isPublic}
            readOnly
            className="mr-2"
            onChange={async () => {
              if (note.isPublic) {
                await markNoteAsPrivate(note.id);
              } else {
                await markNoteAsPublic(note.id);
              }
            }}
          />
          Public
        </label>
      </div>

      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        onBlur={async () => {
          await updateNoteContent({
            id: note.id,
            content,
          });
        }}
        className="border border-gray-300 rounded px-2 py-1 w-full h-32"
      />
    </div>
  );
};
