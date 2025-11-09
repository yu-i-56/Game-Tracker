"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GameForm from "./GameForm";
import { updateGame } from "@/lib/gameActions";

type EditGameFormProps = {
  gameId: string;
  initialData: {
    title: string;
    genre: string;
    platform: string;
    releaseDate: string;
    imageUrl: string;
  };
};

export function EditGameForm({ gameId, initialData }: EditGameFormProps) {
  const router = useRouter();

  async function handleSubmit(data: Parameters<typeof updateGame>[1]) {
    const result = await updateGame(gameId, data);
    if (result.success) {
      toast.success("ゲームを更新しました");
      router.push("/games");
    } else {
      toast.error("ゲームの更新に失敗しました");
      console.error("Failed to update game:", result.error);
    }
  }
  return (
    <GameForm
      initialData={initialData}
      onSubmit={handleSubmit}
      submitLabel="更新"
    />
  );
}
