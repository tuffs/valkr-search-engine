"use client"

import { useEffect } from "react"
import { queryLLM } from "@/actions/llmActions"

interface LLMTesterProps {
  query: string
}

export default function LLMTester({ query }: LLMTesterProps) {
  useEffect(() => {
    if (!query || query.trim() === "") return

    const testLLMQuery = async () => {
      try {
        console.log(`🔍 Testing LLM query: "${query}"`)
        console.log("⏳ Calling LLM API...")

        const result = await queryLLM(query)

        console.log("✅ LLM API Response:", result)

        if (result?.success) {
          console.log("🎯 LLM Query successful")
          console.log("📄 Raw result:", result.result)
        } else {
          console.log("❌ LLM Query failed")
        }
      } catch (error) {
        console.error("🚨 Error testing LLM query:", error)
      }
    }

    // Add a small delay to avoid overwhelming the API on immediate page loads
    const timeoutId = setTimeout(testLLMQuery, 500)

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timeoutId)
  }, [query])

  // This component renders nothing visually
  return null
}
