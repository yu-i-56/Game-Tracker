"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(title: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (title) {
      params.set("search", title);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`/games?${params.toString()}`);
  }

  function handleFilter(filter: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(filter);
    } else if (value) {
      params.set(filter, value);
    } else {
      params.delete(filter);
    }

    params.set("page", "1");
    router.push(`/games?${params.toString()}`);
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Input
        placeholder="ゲームタイトルで検索"
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Select
        onValueChange={(value) => handleFilter("genre", value)}
        defaultValue={searchParams.get("genre") ?? undefined}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="ジャンル" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全て</SelectItem>
          <SelectItem value="RPG">RPG</SelectItem>
          <SelectItem value="アクション">アクション</SelectItem>
          <SelectItem value="アドベンチャー">アドベンチャー</SelectItem>
          <SelectItem value="シミュレーション">シミュレーション</SelectItem>
          <SelectItem value="パズル">パズル</SelectItem>
          <SelectItem value="スポーツ">スポーツ</SelectItem>
          <SelectItem value="シューティング">シューティング</SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => handleFilter("platform", value)}
        defaultValue={searchParams.get("platform") ?? undefined}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="プラットフォーム" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全て</SelectItem>
          <SelectItem value="PlayStation">PlayStation</SelectItem>
          <SelectItem value="Nintendo Switch">Nintendo Switch</SelectItem>
          <SelectItem value="Xbox">Xbox</SelectItem>
          <SelectItem value="PC">PC</SelectItem>
          <SelectItem value="スマートフォン">スマートフォン</SelectItem>
          <SelectItem value="その他">その他</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
