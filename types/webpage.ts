import { Webpage } from "@prisma/client";

export type { Webpage };

export type WebpageCreateInput = {
  title: string;
  url: string;
  description: string;
  thumbnailUrl?: string;
};

export type WebpageUpdateInput = {
  title?: string;
  url?: string;
  description?: string;
  thumbnailUrl?: string;
};

export type SearchResult = {
  success: boolean;
  data?: Webpage[];
  error?: string;
};

export type WebpageResult = {
  success: boolean;
  data?: Webpage;
  error?: string;
};
