export type AllStats = {
  totalGames: number;
  totalReviews: number;
  totalPlayTime: number | null;
  averageRating: number | null;
};

export type GenreStats = {
  genre: string;
  count: number;
  ratio: number;
};

export type PlatformStats = {
  platform: string;
  count: number;
  ratio: number;
};
