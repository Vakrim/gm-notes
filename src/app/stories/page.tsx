import { getAllStories } from "../../lib/stories/actions";

export default async function Stories() {
  const stories = await getAllStories();

  return (
    <div className="card">
      <h1 className="text-2xl font-bold">Stories</h1>
      {stories.map((story) => (
        <div key={story.id}>{story.name}</div>
      ))}
    </div>
  );
}
