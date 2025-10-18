import SearchBar from "@/components/SearchBar";
import Title from "@/components/Title";
import SearchResults from '@/components/SearchResults';
import { searchWebpages } from "@/actions/webpageActions"
import type { Webpage } from '@/types/webpage';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ""

  let webpages: Webpage[] = []
  let error: string | null = null

  if (query) {
    const result = await searchWebpages(query)

    if (result.success && result.data) {
      webpages = result.data
    } else {
      error = result.error || "Failed to fetch search results"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-8">
            <Title size="stamp" />
            <div className="flex-1 max-w-2xl">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {query ? (
          <>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Search results for: <span className="font-medium text-foreground">{query}</span>
              </p>
              {webpages.length > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Found {webpages.length} result{webpages.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            <SearchResults webpages={webpages} error={error} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Start Your Search</h2>
              <p className="text-muted-foreground max-w-md">
                Enter a search query above to find relevant webpages from our index
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}