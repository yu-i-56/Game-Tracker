import { prisma } from "@/lib/prisma";

export async function getGames(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";
  const genre =
    typeof searchParams.genre === "string" ? searchParams.genre : "";
  const platform =
    typeof searchParams.platform === "string" ? searchParams.platform : "";
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;

  const where = {
    title: { contains: search, mode: "insensitive" as const },
    genre: genre && genre !== "all" ? { equals: genre } : undefined,
    platform: platform && platform !== "all" ? { equals: platform } : undefined,
  };

  const [games, total] = await Promise.all([
    prisma.game.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * 10,
      take: 10,
    }),
    prisma.game.count({ where }),
  ]);
  return { games, total, page };
}
