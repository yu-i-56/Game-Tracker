import { prisma } from "@/lib/prisma";

export async function getGameReviews(gameId: string) {
  const reviews = await prisma.gameRecord.findMany({
    where: { gameId },
    orderBy: { createdAt: "desc" },
  });
  return reviews;
}

export async function getGameRecordById(id: string) {
  const record = await prisma.gameRecord.findUnique({
    where: { id },
    include: { game: true },
  });
  return record;
}
