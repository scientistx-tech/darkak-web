import type { MetadataRoute } from 'next';

const BASE_URL = 'https://darkak.com.bd';

interface Seller {
  id: number;
  status: string;
  store_name: string;
}

interface SellerAPIResponse {
  message: string;
  data: Seller[];
}

// Slugify helper
function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

// Fetch approved sellers
async function getApprovedSellers(): Promise<Seller[]> {
  try {
    const res = await fetch('https://api.darkak.com.bd/api/public/seller-all', {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) throw new Error('Failed to fetch sellers');

    const json: SellerAPIResponse = await res.json();
    return json.data.filter((seller) => seller.status === 'approved');
  } catch (err) {
    console.error('Vendor sitemap fetch error:', err);
    return [];
  }
}

// Sitemap for /vendors/sitemap.xml
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sellers = await getApprovedSellers();

  return sellers.map((seller) => ({
    url: `${BASE_URL}/vendors/shop-view/${slugify(seller.store_name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
}
