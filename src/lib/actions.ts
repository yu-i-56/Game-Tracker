"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const gameSchema = z.object({
  title: z.string(),
  genre: z.string(),
  platform: z.string(),
  releaseDate: z.string().optional(),
  imageUrl: z.string().optional(),
});

export async function addGame(data: z.infer<typeof gameSchema>) {
  try {
    await prisma.game.create({
      data: {
        title: data.title,
        genre: data.genre,
        platform: data.platform,
        releaseDate:
          data.releaseDate && !isNaN(Date.parse(data.releaseDate))
            ? new Date(data.releaseDate)
            : null,
        imageUrl: data.imageUrl ?? "",
      },
    });
    revalidatePath("/games");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to add game" };
  }
}

export async function updateGame(id: string, data: z.infer<typeof gameSchema>) {
  try {
    await prisma.game.update({
      where: { id },
      data: {
        title: data.title,
        genre: data.genre,
        platform: data.platform,
        releaseDate:
          data.releaseDate && !isNaN(Date.parse(data.releaseDate))
            ? new Date(data.releaseDate)
            : null,
        imageUrl: data.imageUrl ?? "",
      },
    });
    revalidatePath("/games");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update game" };
  }
}

export async function deleteGame(id: string) {
  try {
    await prisma.game.delete({
      where: { id },
    });
    revalidatePath("/games");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete game" };
  }
}
