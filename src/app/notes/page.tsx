import { getAllNotes } from "../../lib/repos/notes";
import { Note } from "./Note";

export default async function Notes() {
  const notes = await getAllNotes();

  return (
    <>
      <div className="note mb-4 p-4 rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-4">Notes</h1>
      </div>
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </>
  );
}
