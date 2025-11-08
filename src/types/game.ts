export type Game = {
  id: string;
  title: string;
  genre: string;
  platform: string;
  releaseDate?: Date;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GameRecord = {
  id: string;
  gameId: string;
  playStatus: "未プレイ" | "プレイ中" | "クリア済み" | "中断";
  playTime: number;
  rating?: number;
  review?: number;
  playStartDate?: Date;
  playEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  game?: Game;
};
