import { notFound } from "next/navigation";
import { deleteStory, getStory } from "../../../../lib/stories/actions";
import { Note } from "./Note";
import { createNote } from "../../../../lib/notes/actions";
import { TrashButton } from "../../../../lib/ui/TrashButton";

export default async function StoryNotesPage({
  params,
}: {
  params: Promise<{ storyId: string }>;
}) {
  const story = await getStory((await params).storyId);

  if (!story) {
    notFound();
  }

  return (
    <>
      <div className="note mb-4 p-4 rounded-lg bg-white flex justify-between gap-2">
        <h1 className="text-2xl font-bold">{story.name}</h1>
        <TrashButton onClick={deleteStory.bind(null, story.id)} />
      </div>

      {story.notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}

      <div className="note card mb-4 flex flex-col gap-4 ">
        <button
          className="px-2 py-1 rounded bg-primary hover:bg-primary-dark"
          onClick={createNote.bind(null, story.id)}
        >
          Add new note
        </button>
      </div>
    </>
  );
}
