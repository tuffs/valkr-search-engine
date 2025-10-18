"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"

interface SearchBarProps {
  autoFocus?: boolean
}

export default function SearchBar({ autoFocus = false }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (query.trim()) {
      // Navigate to search results page with query parameter
      router.push(`/s?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const isActive = query.length > 0

  return (
    <div className="w-full max-w-xl mx-auto px-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div
          className={`
            flex
            items-stretch
            w-full
            border
            rounded-lg
            overflow-hidden
            transition-all
            duration-300 ease-in-out
            ${isActive ? "opacity-100" : "opacity-75 hover:opacity-100 focus-within:opacity-100"}
          `}
          style={{
            backgroundColor: 'rgba(var(--background-secondary-rgb, 26, 26, 26), 0.8)',
            borderColor: 'var(--searchbar-border)'
          }}
        >
          <input
            type="text"
            placeholder="Enter your search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus={autoFocus}
            className="
              flex-1 
              bg-transparent 
              px-5 py-3
              outline-none 
              focus:outline-none
              border-0
              transition-colors
              duration-200
              placeholder:opacity-60
            "
            style={{
              color: 'var(--foreground)',
            }}
          />
          <button
            type="submit"
            disabled={!isActive}
            className="
              font-medium
              px-8
              transition-colors
              duration-200
              ease-in-out
              border-l
            "
            style={{
              backgroundColor: 'rgba(var(--background-secondary-rgb, 26, 26, 26), 0.3)',
              color: 'var(--foreground)',
              borderColor: 'var(--searchbar-border)',
              opacity: 0.7
            }}
            onMouseEnter={(e) => {
              if (isActive) e.currentTarget.style.opacity = "1"
            }}
            onMouseLeave={(e) => {
              if (isActive) e.currentTarget.style.opacity = "0.7"
            }}
          >
            Go
          </button>
        </div>
      </form>
    </div>
  )
}