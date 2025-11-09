"use client";
import { useRouter } from "next/navigation";
import { addGame } from "@/lib/gameActions";
import GameForm from "./GameForm";
import { toast } from "sonner";

export default function AddGameForm() {
  const router = useRouter();

  async function handleSubmit(data: any) {
    try {
      const result = await addGame({
        ...data,
        releaseDate: data.releaseDate || undefined,
      });

      if (result.success) {
        toast.success("ゲームを追加しました");
        router.push("/games");
      } else {
        toast.error(result.error || "ゲームの追加に失敗しました");
      }
    } catch (error) {
      console.error("Failed to add game", error);
      toast.error("ゲームの追加に失敗しました");
    }
  }
  return <GameForm onSubmit={handleSubmit} />;
}
