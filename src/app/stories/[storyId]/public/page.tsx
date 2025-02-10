import { notFound } from "next/navigation";
import { getPublicStory } from "../../../../lib/stories/actions/getPublicStory";

export default async function PublicStoryPage({
  params,
}: {
  params: Promise<{ storyId: string }>;
}) {
  const story = await getPublicStory((await params).storyId);

  if (!story) {
    notFound();
  }

  return (
    <>
      <div className="note mb-4 p-4 rounded-lg bg-white flex justify-between gap-2">
        <h1 className="text-2xl font-bold">{story.name}</h1>
      </div>

      {story.notes.map((note) => (
        <div key={note.id} className="note card mb-4 flex flex-col gap-4">
          <div className="flex justify-between items-center gap-2">
            {note.name}
          </div>

          <div>{note.content}</div>
        </div>
      ))}
    </>
  );
}
