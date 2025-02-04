import { notFound } from "next/navigation";
import { getStory } from "../../../../lib/stories/actions";
import { Note } from "./Note";

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
      <div className="note mb-4 p-4 rounded-lg bg-white">
        <h1 className="text-2xl font-bold">{story.name}</h1>
      </div>

      {story.notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </>
  );
}
