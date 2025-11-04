import { Game } from "@/generated/prisma";
import GameCard from "./GameCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface GameListProps {
  games: Game[];
  total: number;
  currentPage: number;
}

export default function GameList({ games, total, currentPage }: GameListProps) {
  if (games.length === 0) {
    return (
      <div>
        <p>ゲームが登録されていません</p>
      </div>
    );
  }
  const totalPages = Math.ceil(total / 10);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              asChild
            >
              <Link href={`/games?page=${page}`}>{page}</Link>
            </Button>
          ))}
        </div>
      )}
    </>
  );
}
