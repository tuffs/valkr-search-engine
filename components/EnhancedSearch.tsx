"use client"

import { useEffect, useState } from "react"
import { searchWebpages, addWebpage } from "@/actions/webpageActions"
import { queryLLM } from "@/actions/llmActions"
import { parseLLMResponse, convertToWebpage, deduplicateWebpages, validateWebpage, sanitizeWebpage, type ParsedWebpage } from "@/lib/searchUtils"
import type { Webpage } from "@/types/webpage"
import SearchResults from "@/components/SearchResults"

interface EnhancedSearchProps {
  query: string
}

interface SearchState {
  isLoading: boolean
  webpages: Webpage[]
  error: string | null
  dbResultsCount: number
  llmResultsCount: number
}

export default function EnhancedSearch({ query }: EnhancedSearchProps) {
  const [searchState, setSearchState] = useState<SearchState>({
    isLoading: true,
    webpages: [],
    error: null,
    dbResultsCount: 0,
    llmResultsCount: 0
  })

  useEffect(() => {
    if (!query || query.trim() === "") {
      setSearchState({
        isLoading: false,
        webpages: [],
        error: null,
        dbResultsCount: 0,
        llmResultsCount: 0
      })
      return
    }

    const performSearch = async () => {
      setSearchState(prev => ({ ...prev, isLoading: true, error: null }))

      try {
        // Execute database search and LLM query in parallel for maximum performance
        const [dbResult, llmResult] = await Promise.allSettled([
          searchWebpages(query),
          queryLLM(query)
        ])

        let dbWebpages: Webpage[] = []
        let llmWebpages: Webpage[] = []
        let searchError: string | null = null

        // Process database results
        if (dbResult.status === 'fulfilled' && dbResult.value.success && dbResult.value.data) {
          dbWebpages = dbResult.value.data
        } else if (dbResult.status === 'rejected') {
          console.error('Database search failed:', dbResult.reason)
          searchError = "Database search encountered an error"
        }

        // Process LLM results
        if (llmResult.status === 'fulfilled' && llmResult.value?.success && llmResult.value.result?.choices?.[0]?.message?.content) {
          const llmContent = llmResult.value.result.choices[0].message.content
          const parsedLLMResults = parseLLMResponse(llmContent)

          // Assign proper temporary IDs and validate data
          llmWebpages = parsedLLMResults
            .map((parsed: ParsedWebpage, index: number) => convertToWebpage(parsed, Date.now() + index))
            .map((webpage: Webpage) => sanitizeWebpage(webpage))
            .filter((webpage: Webpage) => validateWebpage(webpage))

          console.log(`🔍 Parsed ${parsedLLMResults.length} URLs from LLM response, ${llmWebpages.length} valid after validation`)
        } else if (llmResult.status === 'rejected') {
          console.error('LLM search failed:', llmResult.reason)
          // Don't set error for LLM failure, just continue with database results
        }        // Deduplicate and combine results (database first, then LLM)
        const combinedWebpages = deduplicateWebpages(dbWebpages, llmWebpages)

        console.log(`📊 Search Results Summary:
          - Database results: ${dbWebpages.length}
          - LLM results: ${llmWebpages.length}
          - Combined (after deduplication): ${combinedWebpages.length}`)

        // Update state with results
        setSearchState({
          isLoading: false,
          webpages: combinedWebpages,
          error: searchError,
          dbResultsCount: dbWebpages.length,
          llmResultsCount: llmWebpages.length
        })

        // Add new LLM results to database asynchronously (don't block UI)
        if (llmWebpages.length > 0) {
          addLLMResultsToDatabase(llmWebpages, dbWebpages)
        }

      } catch (error) {
        console.error('Search failed:', error)
        setSearchState({
          isLoading: false,
          webpages: [],
          error: "Search failed. Please try again.",
          dbResultsCount: 0,
          llmResultsCount: 0
        })
      }
    }

    performSearch()
  }, [query])

  // Asynchronously add LLM results to database
  const addLLMResultsToDatabase = async (llmWebpages: Webpage[], dbWebpages: Webpage[]) => {
    const existingUrls = new Set(dbWebpages.map(page => page.url.toLowerCase()))
    const newWebpages = llmWebpages.filter(page => !existingUrls.has(page.url.toLowerCase()))

    if (newWebpages.length === 0) {
      console.log("📝 No new URLs to add to database")
      return
    }

    console.log(`📝 Adding ${newWebpages.length} new URLs to database...`)

    // Add each new webpage to database with proper error handling
    const addPromises = newWebpages.map(async (webpage, index) => {
      try {
        // Add a small delay between requests to avoid overwhelming the database
        if (index > 0) {
          await new Promise(resolve => setTimeout(resolve, 100 * index))
        }

        const result = await addWebpage({
          title: webpage.title,
          url: webpage.url,
          description: webpage.description,
          thumbnailUrl: webpage.thumbnailUrl || undefined
        })

        if (result.success) {
          console.log(`✅ Added to database: ${webpage.title}`)
          return { success: true, webpage }
        } else {
          console.log(`❌ Failed to add: ${webpage.title} - ${result.error}`)
          return { success: false, webpage, error: result.error }
        }
      } catch (error) {
        console.log(`❌ Error adding ${webpage.title}:`, error)
        return { success: false, webpage, error: String(error) }
      }
    })

    // Execute all database additions and collect results
    const results = await Promise.allSettled(addPromises)
    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length
    const failed = results.length - successful

    console.log(`📝 Database insertion complete: ${successful} successful, ${failed} failed`)
  }  // Show loading state
  if (searchState.isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto py-12">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="relative">
            <div
              className="w-12 h-12 rounded-full border-4 border-solid animate-spin"
              style={{
                borderColor: 'var(--border)',
                borderTopColor: 'var(--foreground)'
              }}
            />
          </div>
          <div>
            <h3
              className="text-lg font-medium mb-2"
              style={{ color: 'var(--foreground)', opacity: 0.9 }}
            >
              Searching for results...
            </h3>
            <p style={{ color: 'var(--foreground)', opacity: 0.6 }}>
              Combining database and AI-powered results
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Render results
  return (
    <>
      <div className="mb-4 sm:mb-6 space-y-1">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Search results for: <span className="font-medium text-foreground break-words">{query}</span>
        </p>
        {searchState.webpages.length > 0 && (
          <div className="flex flex-col gap-1 text-xs sm:text-sm text-muted-foreground">
            <p>
              Found {searchState.webpages.length} result{searchState.webpages.length !== 1 ? "s" : ""}
            </p>
            {(searchState.dbResultsCount > 0 || searchState.llmResultsCount > 0) && (
              <p className="opacity-75">
                {searchState.dbResultsCount > 0 && `${searchState.dbResultsCount} from database`}
                {searchState.dbResultsCount > 0 && searchState.llmResultsCount > 0 && " • "}
                {searchState.llmResultsCount > 0 && `${searchState.llmResultsCount} from AI search`}
              </p>
            )}
          </div>
        )}
      </div>
      <SearchResults
        webpages={searchState.webpages}
        error={searchState.error}
        isLoading={false}
      />
    </>
  )
}
