"use client"

import type { Webpage } from '@/types/webpage'
import { getRelativeTime } from '@/lib/timeUtils'
import { useState, useEffect } from 'react'

interface SearchResultProps {
  webpage?: Webpage
  isLoading?: boolean
}

export default function SearchResult({ webpage, isLoading = false }: SearchResultProps) {
  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    if (webpage && !webpage.title) {
      setHasError(true)
    }
  }, [webpage])

  if (hasError) {
    return (
      <li className='py-4 px-0'>
        <div
          className='flex items-center gap-3'
          style={{ color: 'var(--foreground)', opacity: 0.5 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-sm">An error occurred, unable to load this result.</span>
        </div>
      </li>
    )
  }

  if (isLoading || !webpage) {
    return (
      <li className='py-4 px-0 animate-pulse'>
        <div
          className='h-6 rounded w-3/4 mb-2'
          style={{ backgroundColor: 'var(--border)', opacity: 0.3 }}
        />
        <div
          className='h-4 rounded w-full mb-3'
          style={{ backgroundColor: 'var(--border)', opacity: 0.2 }}
        />
        <div className='flex gap-3'>
          <div
            className='h-3 rounded w-48'
            style={{ backgroundColor: 'var(--border)', opacity: 0.2 }}
          />
          <div
            className='h-3 rounded w-12'
            style={{ backgroundColor: 'var(--border)', opacity: 0.2 }}
          />
        </div>
      </li>
    )
  }

  const relativeTime = getRelativeTime(webpage.createdAt)

  return (
    <li className='py-4 px-0 group'>
      <a
        href={webpage.url}
        target='_blank'
        rel='noopener noreferrer'
        className='block transition-all duration-200'
      >
        <h3
          className='font-bold text-lg mb-1 group-hover:underline'
          style={{ color: 'var(--foreground)' }}
        >
          {webpage.title}
        </h3>
        <p
          className='text-base mb-2 leading-relaxed'
          style={{ color: 'var(--foreground)', opacity: 0.8 }}
        >
          {webpage.description}
        </p>
        <div
          className='flex items-center gap-3 text-sm'
          style={{ color: 'var(--foreground)', opacity: 0.6 }}
        >
          <span className='truncate max-w-md'>{webpage.url}</span>
          <span style={{ opacity: 0.8 }}>•</span>
          <span className='whitespace-nowrap'>{relativeTime}</span>
        </div>
      </a>
    </li>
  )
}