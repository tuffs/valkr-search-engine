import type { Webpage } from "@/types/webpage";

export interface ParsedWebpage {
  title: string;
  description: string;
  url: string;
  createdAt: Date;
}

/**
 * Validate that a URL is likely to be real and accessible
 */
export function validateUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);

    // Must be http or https
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return false;
    }

    // Must have a valid hostname
    if (!urlObj.hostname || urlObj.hostname.length < 3) {
      return false;
    }

    // Block obviously fake domains
    const fakeDomains = [
      "example.com",
      "example.org",
      "example.net",
      "test.com",
      "demo.com",
      "placeholder.com",
      "sample.com",
      "localhost",
      "127.0.0.1",
    ];

    if (fakeDomains.includes(urlObj.hostname.toLowerCase())) {
      return false;
    }

    // Must have valid TLD (basic check)
    const tldPattern = /\.[a-z]{2,}$/i;
    if (!tldPattern.test(urlObj.hostname)) {
      return false;
    }

    // Block IP addresses (usually not real content sites)
    const ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (ipPattern.test(urlObj.hostname)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function parseLLMResponse(content: string): ParsedWebpage[] {
  const results: ParsedWebpage[] = [];

  // Split by triple hyphens to get individual entries
  const entries = content.split("---").filter((entry) => entry.trim() !== "");

  for (const entry of entries) {
    const lines = entry
      .trim()
      .split("\n")
      .filter((line) => line.trim() !== "");

    // Each entry should have exactly 4 lines: title, description, url, timestamp
    if (lines.length >= 4) {
      const title = lines[0].trim();
      const description = lines[1].trim();
      const url = lines[2].trim();
      const timestampStr = lines[3].trim();

      // Parse the timestamp
      let createdAt: Date;
      try {
        // Handle PostgreSQL format: YYYY-MM-DD HH:MM:SS
        createdAt = new Date(timestampStr);
        // If invalid date, use current date
        if (isNaN(createdAt.getTime())) {
          createdAt = new Date();
        }
      } catch {
        createdAt = new Date();
      }

      // Validate URL format with enhanced validation
      if (title && description && url && validateUrl(url)) {
        results.push({
          title,
          description,
          url,
          createdAt,
        });
      }
    }
  }

  return results;
}

export function convertToWebpage(
  parsed: ParsedWebpage,
  tempId?: number
): Webpage {
  return {
    // Use negative IDs for temporary entries to avoid conflicts with real DB IDs
    // This ensures they won't conflict with actual database auto-increment IDs
    id: tempId ? -Math.abs(tempId) : -Date.now(),
    title: parsed.title,
    url: parsed.url,
    description: parsed.description,
    thumbnailUrl: null,
    createdAt: parsed.createdAt,
    updatedAt: new Date(),
  };
}

export function deduplicateWebpages(
  dbResults: Webpage[],
  llmResults: Webpage[]
): Webpage[] {
  const combinedResults: Webpage[] = [...dbResults];
  const existingUrls = new Set(dbResults.map((page) => page.url.toLowerCase()));

  // Add LLM results that don't already exist in database results
  for (const llmPage of llmResults) {
    if (!existingUrls.has(llmPage.url.toLowerCase())) {
      combinedResults.push(llmPage);
      existingUrls.add(llmPage.url.toLowerCase());
    }
  }

  return combinedResults;
}

/**
 * Generate a safe, unique key for React components
 * Uses URL as primary identifier since it's guaranteed unique
 * Falls back to ID for edge cases
 */
export function generateWebpageKey(webpage: Webpage): string {
  // Use URL hash for consistent, unique keys
  const urlHash = btoa(webpage.url)
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, 16);
  return `webpage-${urlHash}-${Math.abs(webpage.id)}`;
}

/**
 * Generate loading placeholder keys
 */
export function generateLoadingKey(index: number): string {
  return `loading-${index}`;
}

/**
 * Validate webpage data for completeness and correctness
 */
export function validateWebpage(webpage: Webpage): boolean {
  return !!(
    webpage.title?.trim() &&
    webpage.description?.trim() &&
    webpage.url?.trim() &&
    validateUrl(webpage.url) && // Enhanced URL validation
    webpage.title.length <= 255 &&
    webpage.description.length <= 255 &&
    webpage.url.length <= 2048
  );
}

/**
 * Sanitize webpage data to prevent issues
 */
export function sanitizeWebpage(webpage: Webpage): Webpage {
  return {
    ...webpage,
    title: webpage.title?.trim().substring(0, 255) || "Untitled",
    description:
      webpage.description?.trim().substring(0, 255) ||
      "No description available",
    url: webpage.url?.trim().substring(0, 2048) || "",
  };
}
