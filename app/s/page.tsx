import SearchBar from "@/components/SearchBar";
import Title from "@/components/Title";
import SearchResults from '@/components/SearchResults';
import type { Webpage } from '@/types/webpage';

const mockWebpages: Webpage[] = [
  {
    id: 1,
    title: "Understanding TypeScript Generics",
    url: "https://example.com/typescript-generics",
    description:
      "A comprehensive guide to using generics in TypeScript for type-safe, reusable code patterns and advanced type manipulation.",
    thumbnailUrl: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Next.js App Router Best Practices",
    url: "https://example.com/nextjs-app-router",
    description:
      "Learn the best practices for building modern web applications with Next.js App Router, including server components and streaming.",
    thumbnailUrl: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Tailwind CSS Design Patterns",
    url: "https://example.com/tailwind-patterns",
    description:
      "Explore common design patterns and component architectures using Tailwind CSS utility classes for rapid UI development.",
    thumbnailUrl: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    updatedAt: new Date(),
  },
]

export default function SearchPage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4'>
      <div className='p-4 w-full max-w-3xl'>
        <Title size="main" />
        <SearchBar />

        <div className="w-full max-w-4xl space-y-12">
          <div className='mt-12'>
            <SearchResults webpages={mockWebpages} />
          </div>
        </div>
      </div>
    </div>
  )
}