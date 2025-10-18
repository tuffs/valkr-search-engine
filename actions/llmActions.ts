"use server";

export async function queryLLM(query: string) {
  try {
    // Optimized prompt for Gemini 2.5 Fast with focus on real, active URLs
    const prompt = `You are a web search result generator. Generate EXACTLY ${
      process.env.MAX_RESPONSE_BOUND || 15
    } real, active, high-quality webpage results for the given search query.

CRITICAL REQUIREMENTS:
- URLs MUST be real, active, and currently accessible
- URLs MUST be highly relevant to the search query
- Focus on authoritative, well-known websites
- Include educational sites (.edu), official documentation, major platforms
- NO fictional or placeholder URLs
- NO broken or inactive links

FORMAT (exactly 4 lines per result, separated by ---):
Title
Description
URL
2024-01-15 10:30:00

Search Query: ${query}

Generate exactly ${
      process.env.MAX_RESPONSE_BOUND || 15
    } results. Be fast and accurate.`;

    const result = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://valkr.io",
          "X-Title": "Valkr Search Engine",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-exp:free", // Switched to Gemini 2.5 Fast
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.3, // Lower temperature for more consistent, factual results
          max_tokens: 2000,
          top_p: 0.9,
        }),
      }
    );

    if (!result.ok) {
      throw new Error(
        `OpenRouter API error: ${result.status} ${result.statusText}`
      );
    }

    const responseData = await result.json();

    if (responseData.error) {
      throw new Error(`OpenRouter API error: ${responseData.error.message}`);
    }

    console.log("Response from AI:", responseData);

    return { success: true, result: responseData };
  } catch (error) {
    console.error("Error: ", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to query LLM",
    };
  }
}
