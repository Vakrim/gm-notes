"use client";

import { useState } from "react";
import {
  markNoteAsPrivate,
  markNoteAsPublic,
  updateNoteContent,
  updateNoteName,
} from "../../lib/repos/actions";
import { Note as NoteObject } from "../../lib/repos/notes";

export const Note = ({ note }: { note: NoteObject }) => {
  const [name, setName] = useState(note.name);
  const [content, setContent] = useState(note.content);

  return (
    <div
      key={note.id}
      className="note mb-4 p-4 bg-white rounded-lg flex flex-col gap-4 shadow-md"
    >
      <div className="flex justify-between items-center">
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
          className="border border-gray-300 rounded px-2 py-1 flex-grow mr-2"
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
