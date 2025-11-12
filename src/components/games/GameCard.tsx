import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Game } from "@prisma/client";
import { Edit } from "lucide-react";
import { DeleteGameButton } from "./DeleteGameButton";
import Image from "next/image";

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle>{game.title}</CardTitle>
            <CardDescription>{game.platform}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/games/${game.id}/edit`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            <DeleteGameButton gameId={game.id} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-row gap-4 items-center justify-between">
        <div>
          <div className="flex gap-2 mb-4">
            <Badge>{game.genre}</Badge>
            {game.releaseDate && (
              <Badge variant="outline">
                {new Date(game.releaseDate).getFullYear()}年
              </Badge>
            )}
          </div>
          <Button className="mt-4" variant="outline" asChild>
            <Link href={`/games/${game.id}`}>詳細</Link>
          </Button>
        </div>
        {game.imageUrl && (
          <div className="relative w-30 h-30">
            <Image
              src={game.imageUrl}
              alt={game.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-t-md"
              priority
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
