import { getRecentGames } from "@/lib/games";
import GameList from "@/components/games/GameList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import SearchBar from "@/components/games/SearchBar";
import { Suspense } from "react";

export default async function RecentGamePages() {
  const recentGames = await getRecentGames();
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-4 px-4">
        <div>
          <h1 className="text-2xl font-bold mt-2">最近追加したゲーム一覧</h1>
          <p className="text-muted-foreground mt-2">
            最近追加した {recentGames.length}件のゲームを表示
          </p>
        </div>
        <Button asChild>
          <Link href="/games/add">
            <Plus className="mr-2 h-4 w-4" />
            ゲームを追加
          </Link>
        </Button>
      </div>
      <div className="mb-6">
        <SearchBar />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <GameList games={recentGames} total={recentGames.length} />
      </Suspense>
    </div>
  );
}
