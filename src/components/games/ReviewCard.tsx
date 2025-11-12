import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameRecord } from "@prisma/client";
import { RatingDisplay } from "./RatingDisplay";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { ClockIcon, Pencil } from "lucide-react";
import { DeleteReviewButton } from "./DeleteReviewButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ReviewCardProps = {
  review: GameRecord;
  onEdit?: (review: GameRecord) => void;
  onDelete?: (id: string) => void;
};

export function ReviewCard({ review, onEdit, onDelete }: ReviewCardProps) {
  const getPlayStatusColor = (status: string) => {
    switch (status) {
      case "クリア済み":
        return "bg-green-500";
      case "プレイ中":
        return "bg-blue-500";
      case "中断":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge className={getPlayStatusColor(review.playStatus)}>
              {review.playStatus}
            </Badge>
            {review.createdAt && (
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                  locale: ja,
                })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/games/${review.gameId}/review/${review.id}`}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">編集</span>
              </Link>
            </Button>
            <DeleteReviewButton reviewId={review.id} gameId={review.gameId} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4">
          {review.rating && review.rating > 0 && (
            <RatingDisplay rating={review.rating} />
          )}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <ClockIcon className="h-4 w-4" />
            <span>
              {Math.floor(review.playTime / 60)}時間 {review.playTime % 60}分
            </span>
          </div>
        </div>

        {review.review && (
          <p className="flex gap-2 text-xs text-muted-foreground">
            {review.review}
          </p>
        )}

        <div className="flex gap-2 text-xs text-muted-foreground">
          {review.playStartDate && (
            <span>
              開始: {new Date(review.playStartDate).toLocaleDateString("ja-JP")}
            </span>
          )}
          {review.playEndDate && (
            <span>
              終了: {new Date(review.playEndDate).toLocaleDateString("ja-JP")}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
