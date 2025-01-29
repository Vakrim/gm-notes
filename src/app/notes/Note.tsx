"use client";

import { useState } from "react";
import {
  markNoteAsPrivate,
  markNoteAsPublic,
  updateNoteNameAndContent,
} from "../../lib/repos/actions";
import { Note as NoteObject } from "../../lib/repos/notes";
import ContentEditable from "react-contenteditable";
import { sanitizeNoteContent } from "../../lib/sanitizeNoteContent";

export const Note = ({ note }: { note: NoteObject }) => {
  const [name, setName] = useState(note.name);
  const [content, setContent] = useState(note.content);

  return (
    <div
      key={note.id}
      className="note mb-4 p-4 bg-white rounded-lg flex flex-col gap-1"
    >
      <div className="flex justify-between">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

      <ContentEditable
        html={content}
        onChange={(e) => {
          setContent(sanitizeNoteContent(e.target.value));
        }}
      />

      <button
        onClick={() => {
          setContent((current) =>
            sanitizeNoteContent(current + " <span class='note-tag'>tag</span>"),
          );
        }}
      >
        add tag
      </button>
    </div>
  );
};
