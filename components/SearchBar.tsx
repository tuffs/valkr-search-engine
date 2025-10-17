"use client"

import { useState, type FormEvent } from "react"

export default function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Search query:", query)
  }

  const isActive = query.length > 0

  return (
    <div className="w-full max-w-xl mx-auto px-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div
          className={`
            flex items-stretch w-full
            bg-black/65 
            border border-gray-400/30 
            rounded-lg overflow-hidden
            transition-opacity duration-300 ease-in-out
            ${isActive ? "opacity-100" : "opacity-75 hover:opacity-100 focus-within:opacity-100"}
          `}
        >
          <input
            type="text"
            placeholder="Enter your search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              flex-1 
              bg-transparent 
              text-gray-300
              placeholder:text-gray-500
              px-5 py-3
              outline-none 
              focus:outline-none
              border-0
              transition-colors
              duration-200
            "
          />
          <button
            type="submit"
            className="
              bg-transparent/20
              text-gray-500
              hover:text-gray-300
              font-medium
              px-8
              transition-colors
              duration-200
              ease-in-out
              border-l
              border-gray-400/30
            "
          >
            Go
          </button>
        </div>
      </form>
    </div>
  )
}