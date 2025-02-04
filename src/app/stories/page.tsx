import { getMyStories } from "../../lib/stories/actions";
import Link from "next/link";

export default async function Stories() {
  const stories = await getMyStories();

  return (
    <div className="card flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Stories</h1>
      <hr className="border-t border-gray-200" />
      {stories.map((story) => (
        <Link
          key={story.id}
          href={`/stories/${story.id}/notes`}
          className="block p-4 rounded-lg bg-white bg-gray-100 hover:bg-primary"
        >
          {story.name}
        </Link>
      ))}
    </div>
  );
}
