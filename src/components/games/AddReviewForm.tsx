"use client";
import { useRouter } from "next/navigation";
import { addReview } from "@/lib/reviewActions";
import { toast } from "sonner";
import { ReviewForm } from "./ReviewForm";
import { useTransition } from "react";

type AddReviewFormProps = {
  gameId: string;
};

export function AddReviewForm({ gameId }: AddReviewFormProps) {
  const router = useRouter();

  async function handleSubmit(values: Parameters<typeof addReview>[1]) {
    try {
      const result = await addReview(gameId, values);

      if (result.success) {
        toast.success("レビューを追加しました");
        router.push(`/games/${gameId}`);
      } else {
        toast.error(result.error || "レビューの保存に失敗しました");
      }
    } catch (error) {
      console.error("Failed to add review", error);
      toast.error("レビューの保存に失敗しました");
    }
  }
  return <ReviewForm gameId={gameId} onSubmit={handleSubmit} />;
}
