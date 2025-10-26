import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart3, Gamepad2, Plus, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Game Tracker</h1>
        <p className="text-xl text-muted-foreground mb-8">
          プレイしたゲームの記録・管理・レビューアプリ
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/games/add">
              <Plus className="mr-2 h-4 w-4" />
              ゲームを追加
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/games">
              <Gamepad2 className="mr-2 h-4 w-4" />
              ゲーム一覧
            </Link>
          </Button>
        </div>
      </div>
      <div
        className="grid grid-cols-1 col md:grid-cols-2 
      lg:grid-cols-3 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gamepad2 className="mr-2 h-4 w-4" />
              ゲーム管理
            </CardTitle>
            <CardDescription>プレイしたゲームを記録・管理</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ゲームのタイトル、ジャンル、プラットフォーム、発売日などの情報を管理
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-4 w-4" />
              レビュー・評価
            </CardTitle>
            <CardDescription>ゲームの評価とレビューを記録</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              5段階評価でゲームの良さを記録
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              統計・分析
            </CardTitle>
            <CardDescription>プレイデータの可視化と分析</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ジャンル別統計、プレイ時間、評価分布の確認
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
