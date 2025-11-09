import { prisma } from "@/lib/prisma";
import { EditGameForm } from "@/components/games/EditGameForm";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditGamePage({ params }: Params) {
  const { id } = await params;
  if (!id) {
    notFound();
  }
  const game = await prisma.game.findUnique({
    where: { id },
  });

  if (!game) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <header>
        <h1 className="text-2xl font-bold">ゲームを編集</h1>
        <p className="text-sm text-muted-foreground">情報を更新してください</p>
      </header>
      <EditGameForm
        gameId={id}
        initialData={{
          title: game.title,
          genre: game.genre,
          platform: game.platform,
          releaseDate: game.releaseDate
            ? new Date(game.releaseDate).toISOString().slice(0, 10)
            : "",
          imageUrl: game.imageUrl ?? "",
        }}
      />
    </div>
  );
}
