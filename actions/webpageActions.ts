"use server";

import { prisma } from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function getNextWebpageId(): Promise<number> {
  try {
    const lastWebpage = await prisma.webpage.findFirst({
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
      },
    });

    return (lastWebpage?.id || 0) + 1;
  } catch (error) {
    console.error("Error getting next webpage ID:", error);
    // Fallback to current timestamp to ensure uniqueness
    return Date.now();
  }
}

export async function searchWebpages(query: string) {
  try {
    const webpages = await prisma.webpage.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            url: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return { success: true, data: webpages };
  } catch (error) {
    console.error("Error searching webpages:", error);
    return { success: false, error: "Failed to search webpages" };
  }
}

export async function getAllWebpages() {
  try {
    const webpages = await prisma.webpage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: webpages };
  } catch (error) {
    console.error("Error fetching webpages:", error);
    return { success: false, error: "Failed to fetch webpages" };
  }
}

export async function addWebpage(data: {
  title: string;
  url: string;
  description: string;
  thumbnailUrl?: string;
}) {
  try {
    const webpage = await prisma.webpage.create({
      data,
    });

    revalidatePath("/");
    return { success: true, data: webpage };
  } catch (error) {
    console.error("Error adding webpage:", error);
    return { success: false, error: "Failed to add webpage" };
  }
}

export async function updateWebpage(
  id: number,
  data: {
    title?: string;
    url?: string;
    description?: string;
    thumbnailUrl?: string;
  }
) {
  try {
    const webpage = await prisma.webpage.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    return { success: true, data: webpage };
  } catch (error) {
    console.error("Error updating webpage:", error);
    return { success: false, error: "Failed to update webpage" };
  }
}

export async function deleteWebpage(id: number) {
  try {
    await prisma.webpage.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting webpage:", error);
    return { success: false, error: "Failed to delete webpage" };
  }
}

export async function getWebpageById(id: number) {
  try {
    const webpage = await prisma.webpage.findUnique({
      where: { id },
    });

    return { success: true, data: webpage };
  } catch (error) {
    console.error("Error fetching webpage:", error);
    return { success: false, error: "Failed to fetch webpage" };
  }
}
