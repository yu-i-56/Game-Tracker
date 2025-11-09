"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ReviewForm, type ReviewFormValues } from "./ReviewForm";
import { updateReview } from "@/lib/reviewActions";

type EditReviewFormProps = {
  reviewId: string;
  gameId: string;
  initialData: {
    playStatus: string;
    playTime: number;
    rating: number | undefined;
    review: string;
    playStartDate: string;
    playEndDate: string;
  };
};

export function EditReviewForm({
  reviewId,
  gameId,
  initialData,
}: EditReviewFormProps) {
  const router = useRouter();

  async function handleSubmit(data: ReviewFormValues) {
    const result = await updateReview(reviewId, gameId, data);
    if (result.success) {
      toast.success("レビューを更新しました");
      router.push(`/games/${gameId}`);
    } else {
      toast.error("レビューの更新に失敗しました");
      console.error("Failed to update review:", result.error);
    }
  }
  return (
    <ReviewForm
      gameId={gameId}
      initialData={initialData}
      onSubmit={handleSubmit}
      submitLabel="更新"
    />
  );
}
