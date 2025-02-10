import Link from "next/link";
import { getMyStories } from "../../lib/stories/actions/getMyStories";
import { createStory } from "../../lib/stories/actions/createStory";

export default async function Stories() {
  const stories = await getMyStories();

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stories</h1>
        <button
          onClick={createStory}
          className="px-2 py-1 rounded-sm bg-primary hover:bg-primary-dark cursor-pointer"
        >
          Create new story
        </button>
      </div>
      <hr className="border-t border-gray-200" />
      {stories.map((story) => (
        <Link
          key={story.id}
          href={`/stories/${story.id}/notes`}
          className="block p-4 rounded-lg bg-gray-100 hover:bg-primary"
        >
          {story.name}
        </Link>
      ))}
    </div>
  );
}
