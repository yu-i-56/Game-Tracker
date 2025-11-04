"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const gameSchema = z.object({
  title: z.string().min(1, { message: "タイトルは必須です" }),
  genre: z.string().min(1, { message: "ジャンル選択は必須です" }),
  platform: z.string().min(1, { message: "プラットフォーム選択は必須です" }),
  releaseDate: z.string().optional(),
  imageUrl: z
    .url({ message: "有効なURLを入力してください" })
    .or(z.literal(""))
    .optional(),
});

type GameFormValues = z.infer<typeof gameSchema>;

interface GameFormProps {
  initialData?: Partial<GameFormValues>;
  onSubmit: (data: GameFormValues) => Promise<void>;
  submitLabel?: string;
}

export default function GameForm({
  initialData,
  onSubmit,
  submitLabel = "保存",
}: GameFormProps) {
  const form = useForm<GameFormValues>({
    resolver: zodResolver(gameSchema),
    defaultValues: initialData || {
      title: "",
      genre: "",
      platform: "",
      releaseDate: "",
      imageUrl: "",
    },
  });

  async function handleSubmit(data: GameFormValues) {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Failed to save game", error);
    }
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-2">
      <CardHeader>
        <CardTitle>ゲームを追加</CardTitle>
        <CardDescription>ゲームの情報を入力してください</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タイトル</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    ゲームのタイトルを入力してください
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ジャンル</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="ジャンルを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="RPG">RPG</SelectItem>
                      <SelectItem value="アクション">アクション</SelectItem>
                      <SelectItem value="アドベンチャー">
                        アドベンチャー
                      </SelectItem>
                      <SelectItem value="シミュレーション">
                        シミュレーション
                      </SelectItem>
                      <SelectItem value="パズル">パズル</SelectItem>
                      <SelectItem value="スポーツ">スポーツ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>プラットフォーム</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="プラットフォームを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PlayStation">PlayStation</SelectItem>
                      <SelectItem value="Nintendo Switch">
                        Nintendo Switch
                      </SelectItem>
                      <SelectItem value="PC">PC</SelectItem>
                      <SelectItem value="Xbox">Xbox</SelectItem>
                      <SelectItem value="スマートフォン">
                        スマートフォン
                      </SelectItem>
                      <SelectItem value="その他">その他</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="releaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>発売日</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    ゲームの発売日を入力してください(任意)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>画像URL</FormLabel>
                  <FormControl>
                    <Input type="url" {...field} />
                  </FormControl>
                  <FormDescription>
                    ゲームの画像URLを入力してください(任意)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between pt-6 gap-3 mt-6 border-t">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/games">戻る</Link>
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
