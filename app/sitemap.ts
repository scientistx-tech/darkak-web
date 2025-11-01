import { MetadataRoute } from 'next';
export const dynamic = 'force-dynamic';
type RefreshType = 'weekly' | 'monthly' | 'yearly';

interface Sitemap {
  id: number;
  title: string;
  url: string;
  priority: number;
  date: string;
  refresh: RefreshType;
}

// optional: export const runtime = 'edge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  console.time('sitemap-fetch');
  const maps = await getSiteMap();
  console.timeEnd('sitemap-fetch');

  return maps.map((data: Sitemap) => ({
    url: data.url,
    lastModified: data.date,
    changeFrequency: data.refresh,
    priority: data.priority,
  }));
}

const getSiteMap = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000); // 7s timeout

  try {
    const res = await fetch(`https://api.darkak.com.bd/api/public/sitemap`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });
    clearTimeout(timeout);
    return await res.json();
  } catch (error) {
    console.error('Sitemap fetch error:', error);
    return [];
  }
};
