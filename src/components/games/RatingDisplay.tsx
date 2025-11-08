import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingDisplayProps = {
  rating: number;
  maxRating: number;
  size?: "sm" | "md" | "lg";
};

export function RatingDisplay({
  rating,
  maxRating = 5,
  size = "md",
}: RatingDisplayProps) {
  const sizeClass = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClass[size],
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-none text-gray-300"
          )}
        />
      ))}
      <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
    </div>
  );
}
