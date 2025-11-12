import { getGames } from "@/lib/games";

export default async function stats() {
  const { games, total } = await getGames({});
  return <div>stats</div>;
}
