"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const reviewSchema = z.object({
  playStatus: z.string(),
  playTime: z.number(),
  rating: z.number().optional(),
  review: z.string().optional(),
  playStartDate: z.string().optional(),
  playEndDate: z.string().optional(),
});

export async function addReview(
  gameId: string,
  data: z.infer<typeof reviewSchema>
) {
  try {
    await prisma.gameRecord.create({
      data: {
        gameId,
        rating: data.rating ?? null,
        ...data,
        playStartDate:
          data.playStartDate && !isNaN(Date.parse(data.playStartDate))
            ? new Date(data.playStartDate)
            : null,
        playEndDate:
          data.playEndDate && !isNaN(Date.parse(data.playEndDate))
            ? new Date(data.playEndDate)
            : null,
      },
    });
    revalidatePath("/games");
    return { success: true };
  } catch (error) {
    console.error("failed to add review:", error);
    return { success: false, error: "failed to add review" };
  }
}

export async function updateReview(
  id: string,
  gameId: string,
  data: z.infer<typeof reviewSchema>
) {
  try {
    await prisma.gameRecord.update({
      where: { id },
      data: {
        ...data,
        rating: data.rating ?? null,
        playStartDate:
          data.playStartDate && !isNaN(Date.parse(data.playStartDate))
            ? new Date(data.playStartDate)
            : null,
        playEndDate:
          data.playEndDate && !isNaN(Date.parse(data.playEndDate))
            ? new Date(data.playEndDate)
            : null,
      },
    });
    revalidatePath("/games");
    revalidatePath(`/games/${gameId}`);
    return { success: true };
  } catch (error) {
    console.error("failed to update review:", error);
    return { success: false, error: "failed to update review" };
  }
}

export async function deleteReview(id: string, gameId: string) {
  try {
    await prisma.gameRecord.delete({
      where: { id },
    });
    revalidatePath(`/games/${gameId}`);
    return { success: true };
  } catch (error) {
    console.error("failed to delete review:", error);
    return { success: false, error: "failed to delete review" };
  }
}
