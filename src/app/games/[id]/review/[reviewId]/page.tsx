import { EditReviewForm } from "@/components/games/EditReviewForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{
    id?: string;
    reviewId?: string;
  }>;
};

export default async function EditReviewPage({ params }: Params) {
  const { id, reviewId } = await params;
  if (!id || !reviewId) {
    notFound();
  }

  const record = await prisma.gameRecord.findUnique({
    where: { id: reviewId },
    include: {
      game: { select: { id: true, title: true } },
    },
  });

  if (!record || record.gameId !== id) {
    notFound();
  }

  return (
    <div>
      <header>
        <p></p>
        <h1></h1>
      </header>
      <EditReviewForm
        reviewId={reviewId}
        gameId={id}
        initialData={{
          playStatus: record.playStatus,
          playTime: record.playTime,
          rating: record.rating ?? undefined,
          review: record.review ?? "",
          playStartDate: record.playStartDate?.toISOString().slice(0, 10) ?? "",
          playEndDate: record.playEndDate?.toISOString().slice(0, 10) ?? "",
        }}
      />
    </div>
  );
}
