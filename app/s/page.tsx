import SearchBar from "@/components/SearchBar"
import Title from "@/components/Title"
import EnhancedSearch from "@/components/EnhancedSearch"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ""

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 lg:gap-8">
            <div className="flex-shrink-0">
              <Title size="stamp" />
            </div>
            <div className="flex-1 w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {query ? (
          <EnhancedSearch query={query} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4">
            <div className="text-center space-y-3 sm:space-y-4 max-w-lg">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">Start Your Search</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Enter a search query above to find relevant webpages from our index
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
