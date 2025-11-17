import { prisma } from "@/lib/prisma";
import { AllStats, GenreStats, PlatformStats } from "@/types/stat";

export async function getAllStats(): Promise<AllStats> {
  const [totalGames, totalReviews, totalPlayTime, averageRating] =
    await Promise.all([
      prisma.game.count(),
      prisma.gameRecord.count(),
      prisma.gameRecord.aggregate({ _sum: { playTime: true } }),
      prisma.gameRecord.aggregate({ _avg: { rating: true } }),
    ]);
  return {
    totalGames,
    totalReviews,
    totalPlayTime: totalPlayTime._sum.playTime ?? 0,
    averageRating: averageRating._avg.rating ?? 0,
  };
}

export async function getGenreStats(): Promise<GenreStats[]> {
  const genreCounts = await prisma.game.groupBy({
    by: ["genre"],
    _count: {
      genre: true,
    },
    orderBy: {
      _count: {
        genre: "desc",
      },
    },
  });

  const total = genreCounts.reduce((sum, item) => sum + item._count.genre, 0);

  return genreCounts.map((item) => ({
    genre: item.genre,
    count: item._count.genre,
    ratio: total > 0 ? (item._count.genre / total) * 100 : 0,
  }));
}

export async function getPlatformStats(): Promise<PlatformStats[]> {
  const platformCounts = await prisma.game.groupBy({
    by: ["platform"],
    _count: {
      platform: true,
    },
    orderBy: {
      _count: {
        platform: "desc",
      },
    },
  });

  const total = platformCounts.reduce(
    (sum, item) => sum + item._count.platform,
    0
  );

  return platformCounts.map((item) => ({
    platform: item.platform,
    count: item._count.platform,
    ratio: total > 0 ? (item._count.platform / total) * 100 : 0,
  }));
}
