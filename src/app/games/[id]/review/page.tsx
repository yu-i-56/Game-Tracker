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
    <div className="flex items-center justify-center flex-col mt-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold">{game.title}</h1>
      </header>
      <div className="rounded-2xl p-8 max-w-2xl w-full">
        <AddReviewForm gameId={id} />
      </div>
    </div>
  );
}
