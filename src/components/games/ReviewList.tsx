import { GameRecord } from "@prisma/client";
import { ReviewCard } from "./ReviewCard";

type ReviewListProps = {
  reviews: GameRecord[];
  onEdit?: (review: GameRecord) => void;
  onDelete?: (id: string) => void;
};

export function ReviewList({ reviews, onEdit, onDelete }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">レビューが見つかりません。</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
