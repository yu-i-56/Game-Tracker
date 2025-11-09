import { prisma } from "@/lib/prisma";
import { ReviewList } from "@/components/games/ReviewList";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

type Params = {
  params: {
    id?: string;
  };
};

export default async function GameDetailPage({ params }: Params) {
  const { id } = await params;
  if (!id) {
    notFound();
  }

  const game = await prisma.game.findUnique({
    where: { id },
    include: {
      records: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!game) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{game.title}</h1>
          <div className="flex flex-wrap gap-2 items-center">
            <Badge>{game.genre}</Badge>
            <Badge>{game.platform}</Badge>
            {game.releaseDate && (
              <Badge>{new Date(game.releaseDate).getFullYear()}年</Badge>
            )}
          </div>
        </div>
        <Button asChild>
          <Link href={`/games/${game.id}/review`}>
            <Plus className="mr-2 h-4 w-4" />
            レビューを追加
          </Link>
        </Button>
      </div>
      <section>
        <h2 className="text-2xl font-bold">レビュー一覧</h2>
        <ReviewList reviews={game.records} />
      </section>
    </div>
  );
}
