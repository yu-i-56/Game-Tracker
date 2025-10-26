import { cn } from "@/lib/utils";
import { BarChart3, Home, Plus, Settings } from "lucide-react";
import Link from "next/link";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const navItems = [
    {
      title: "ホーム",
      href: "/",
      icon: Home,
    },
    {
      title: "ゲーム一覧",
      href: "/games",
      icon: BarChart3,
    },
    {
      title: "ゲーム追加",
      href: "/games/add",
      icon: Plus,
    },
    {
      title: "設定",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <nav className={cn("flex flex^col space-y-2", className)}>
      {navItems.map((item) => (
        <Link
          className="flex items-center space-x-3 rounded-lg
            px-3 py-2 text-sm font-medium hover:bg-accent 
            hover:text-accent-foreground"
          key={item.title}
          href={item.href}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
