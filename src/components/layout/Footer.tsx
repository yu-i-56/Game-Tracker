import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div
        className="max-w-none flex flex-col items-center
      justify-between gap-4 md:h-24 md:flex-row"
      >
        <div
          className="flex flex-col items-center gap-4 px-8
        md:flex-row md:gap-2 md:px-0"
        >
          <p
            className="text-center text-sm leading-loose
          text-muted-foreground px-8 md:text-left"
          >
            Build with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
        <div className="flex items-center space-x-4 px-8">
          <a
            className="text-sm text-muted-foreground
          hover:text-foreground"
            href="https://github.com/yu-i-56/Game-Tracker"
          >
            GitHub
          </a>
          <Link
            className="text-sm text-muted-foreground
          hover:text-foreground"
            href="/privacy"
          >
            Privacy
          </Link>
          <Link
            className="text-sm text-muted-foreground
          hover:text-foreground"
            href="/terms"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
