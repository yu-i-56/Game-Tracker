"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const reviewSchema = z.object({
  playStatus: z.string().min(1, "プレイステータスは必須です"),
  playTime: z.number().min(0, "プレイ時間は0分以上で入力してください"),
  rating: z.number().max(5).optional(),
  review: z.string().optional(),
  playStartDate: z.string().optional(),
  playEndDate: z.string().optional(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

type ReviewFormProps = {
  gameId: string;
  initialData?: Partial<ReviewFormValues>;
  onSubmit: (values: ReviewFormValues) => Promise<void>;
  submitLabel?: string;
};

export function ReviewForm({
  gameId,
  initialData,
  onSubmit,
  submitLabel = "保存",
}: ReviewFormProps) {
  const [rating, setRating] = useState<number | null>(
    initialData?.rating ?? null
  );
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: initialData || {
      playStatus: "",
      playTime: 0,
      rating: undefined,
      review: "",
      playStartDate: "",
      playEndDate: "",
    },
  });

  async function handleSubmit(data: ReviewFormValues) {
    try {
      await onSubmit({
        ...data,
        rating: rating ?? undefined,
      });
    } catch (error) {
      console.error("failed to save review:", error);
    }
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-2">
      <CardHeader>
        <CardTitle>レビューを追加</CardTitle>
        <CardDescription>レビューの情報を入力してください</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="playStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>プレイステータス</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="プレイステータスを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="未プレイ">未プレイ</SelectItem>
                      <SelectItem value="プレイ中">プレイ中</SelectItem>
                      <SelectItem value="プレイ済み">プレイ済み</SelectItem>
                      <SelectItem value="中断">中断</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="playTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>プレイ時間</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="プレイ時間を入力"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>評価</FormLabel>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    type="button"
                    variant="ghost"
                    key={star}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={cn(
                        "h-6 w-6 cursor-pointer transition-colors",
                        rating !== null && star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-transparent text-gray-300",
                        "hover:text-yellow-300"
                      )}
                    />
                  </Button>
                ))}
                {rating !== null && rating > 0 && (
                  <Button
                    className="ml-2 text-sm text-muted-foreground hover:underline"
                    variant="ghost"
                    onClick={() => setRating(null)}
                  >
                    クリア
                  </Button>
                )}
              </div>
            </FormItem>

            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>レビュー</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="レビューを入力"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="playStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>プレイ開始日</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="playEndDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>プレイ終了日</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between pt-6 gap-3 mt-6 border-t">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href={`/games/${gameId}`}>戻る</Link>
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full sm:w-auto"
              >
                {form.formState.isSubmitting ? "保存中..." : submitLabel}
              </Button>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
