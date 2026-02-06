import { TBlog } from "./types";

export const getNews = async (): Promise<TBlog[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error("Missing API configuration");
  }

  const response = await fetch(`${apiUrl}?category=general&token=${apiKey}`, {
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog data: ${response.status}`);
  }

  return response.json();
};
