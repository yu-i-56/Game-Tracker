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
        <p className="text-3xl font-bold">{game.title}</p>
        <h1 className="text-2xl font-bold">レビューを追加</h1>
      </header>
      <AddReviewForm gameId={id} />
    </div>
  );
}
