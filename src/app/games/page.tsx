import { Button } from "@/components/ui/button";
import { getGames } from "@/lib/games";
import { Plus } from "lucide-react";
import Link from "next/link";
import GameList from "@/components/games/GameList";
import { Suspense } from "react";
import SearchBar from "@/components/games/SearchBar";

export default async function GamePages({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const { games, total, page } = await getGames(params);
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-4 px-4">
        <div>
          <h1 className="text-2xl font-bold mt-2">ゲーム一覧</h1>
          <p className="text-muted-foreground mt-2">
            合計 {total}件のゲームが登録されています
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
        <GameList games={games} total={total} currentPage={page} />
      </Suspense>
    </div>
  );
}
