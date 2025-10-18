import SearchBar from "@/components/SearchBar";
import Title from "@/components/Title";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Title size="main" />
        <SearchBar autoFocus />

        <div className="mx-auto hidden">
          <Link
            href={"/add-sitemap"}
            className={`
              text-sm
              transition-colors
              duration-200
              hover:opacity-80
            `}
            style={{
              color: 'var(--foreground)',
              opacity: 0.6
            }}
          >
            Submit a Sitemap
          </Link>
        </div>
      </main>
    </div>
  );
}
