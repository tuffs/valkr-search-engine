"use server";

export async function queryLLM(query: string) {
  try {
    console.log(`🤖 LLM search starting for: "${query}"`);

    if (!query || query.trim() === "") {
      console.log("⚠️ Empty query provided to LLM search");
      return { success: false, error: "Empty query provided" };
    }

    if (!process.env.OPENROUTER_API_KEY) {
      console.error("❌ Missing OPENROUTER_API_KEY environment variable");
      return { success: false, error: "API key not configured" };
    }

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

    console.log(`📝 Sending request to OpenRouter API...`);

    const result = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
          "X-Title": "Valkr Search Engine",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-exp:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 2000,
          top_p: 0.9,
        }),
      }
    );

    console.log(`📡 OpenRouter API response status: ${result.status}`);

    if (!result.ok) {
      const errorText = await result.text();
      console.error(
        `❌ OpenRouter API error: ${result.status} ${result.statusText} - ${errorText}`
      );
      throw new Error(
        `OpenRouter API error: ${result.status} ${result.statusText}`
      );
    }

    const responseData = await result.json();
    console.log(`📊 OpenRouter API response structure:`, {
      hasChoices: !!responseData.choices,
      choicesLength: responseData.choices?.length || 0,
      hasContent: !!responseData.choices?.[0]?.message?.content,
      contentLength: responseData.choices?.[0]?.message?.content?.length || 0,
      hasError: !!responseData.error,
    });

    if (responseData.error) {
      console.error(`❌ OpenRouter API returned error:`, responseData.error);
      throw new Error(`OpenRouter API error: ${responseData.error.message}`);
    }

    if (!responseData.choices || responseData.choices.length === 0) {
      console.error(`❌ OpenRouter API returned no choices`);
      throw new Error("No response choices received from API");
    }

    if (!responseData.choices[0]?.message?.content) {
      console.error(`❌ OpenRouter API returned empty content`);
      throw new Error("Empty content received from API");
    }

    console.log("✅ LLM search completed successfully");
    return { success: true, result: responseData };
  } catch (error) {
    console.error("❌ LLM search error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to query LLM",
    };
  }
}
