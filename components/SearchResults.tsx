"use client"

import type { Webpage } from '@/types/webpage';
import SearchResult from '@/components/SearchResult';

interface SearchResultsProps {
  webpages?: Webpage[]
  isLoading?: boolean
  error?: string | null
}

export default function SearchResults({ webpages, isLoading = false, error = null }: SearchResultsProps) {
  if (error) {
    return (
      <div className='w-full max-w-3xl mx-auto py-12'>
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          <svg
            className="w-16 h-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: 'var(--foreground)', opacity: 0.4 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3
              className='text-xl font-semibold mb-2'
              style={{ color: 'var(--foreground)', opacity: 0.9 }}
            >
              Something went wrong
            </h3>
            <p style={{ color: 'var(--foreground)', opacity: 0.6 }}>
              {error}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <ul
        className='w-full max-w-3xl mx-auto divide-y'
        style={{ borderColor: 'var(--border-secondary)' }}
      >
        {[...Array(5)].map((_, i) => (
          <SearchResult key={i} isLoading={true} />
        ))}
      </ul>
    )
  }

  if (!webpages || webpages.length === 0) {
    return (
      <div className='w-full max-w-3xl mx-auto py-12'>
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          <svg
            className="w-16 h-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: 'var(--foreground)', opacity: 0.4 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <div>
            <h3
              className='text-xl font-semibold mb-2'
              style={{ color: 'var(--foreground)', opacity: 0.9 }}
            >
              No results found
            </h3>
            <p style={{ color: 'var(--foreground)', opacity: 0.6 }}>
              Try adjusting your search query
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ul
      className='w-full max-w-3xl mx-auto divide-y'
      style={{ borderColor: 'var(--border-secondary)' }}
    >
      {webpages.map((webpage) => (
        <SearchResult key={webpage.id} webpage={webpage} />
      ))}
    </ul>
  )

}

