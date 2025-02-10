import { notFound } from "next/navigation";
import { Note } from "./Note";
import { createNote } from "../../../../lib/notes/actions";
import { TrashButton } from "../../../../lib/ui/TrashButton";
import { deleteStory } from "../../../../lib/stories/actions/deleteStory";
import { getStory } from "../../../../lib/stories/actions/getStory";

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
        <TrashButton onClick={deleteStory.bind(null, { storyId: story.id })} />
      </div>

      {story.notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}

      <div className="note card mb-4 flex flex-col gap-4 ">
        <button
          className="px-2 py-1 rounded-sm bg-primary hover:bg-primary-dark"
          onClick={createNote.bind(null, { storyId: story.id })}
        >
          Add new note
        </button>
      </div>
    </>
  );
}
