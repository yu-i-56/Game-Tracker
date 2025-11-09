import { AddReviewForm } from "@/components/games/AddReviewForm";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id?: string;
  }>;
};

export default async function ReviewPage({ params }: Params) {
  const { id } = await params;
  if (!id) {
    notFound();
  }

  const game = await prisma.game.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
    },
  });

  if (!game) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">{game.title}</h1>
        <p className="text-md text-muted-foreground">
          レビューを入力してください
        </p>
      </header>
      <AddReviewForm gameId={id} />
    </div>
  );
}
