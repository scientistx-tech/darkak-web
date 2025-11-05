import type { MetadataRoute } from 'next';

const BASE_URL = 'https://darkak.com.bd';

interface Product {
  id: number;
  title: string;
  slug: string;
}

interface ProductAPIResponse {
  total: number;
  totalPage: number;
  data: Product[];
}

// Fetch product data
async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://api.darkak.com.bd/api/public/filter?limit=100', {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 3600 }, // revalidate every 1 hour
    });

    if (!res.ok) throw new Error('Failed to fetch products');

    const json: ProductAPIResponse = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Product sitemap error:', err);
    return [];
  }
}

// Sitemap for /product/sitemap.xml
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  return products.map((product) => ({
    url: `${BASE_URL}/product/${encodeURIComponent(product.slug)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));
}
