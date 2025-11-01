import type { MetadataRoute } from 'next';

const BASE_URL = 'https://darkak.com.bd';

interface SubSubCategory {
  id: number;
  title: string;
  subCategoryId: number;
  categoryId: number;
}

interface SubCategory {
  id: number;
  title: string;
  categoryId: number;
  sub_sub_category: SubSubCategory[];
}

interface Category {
  id: number;
  title: string;
  sub_category: SubCategory[];
}

// Utility: Convert to slug
function slugify(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, '-');
}

// Utility: Fetch categories
async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`https://api.darkak.com.bd/api/public/category`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 3600 }, // revalidate every 1 hour
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    return [];
  }
}

// Export sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allCategories = await getCategories();

  const urls: MetadataRoute.Sitemap = [];

  for (const cat of allCategories) {
    const catSlug = encodeURIComponent(slugify(cat.title));
    urls.push({
      url: `${BASE_URL}/category/${catSlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });

    for (const sub of cat.sub_category) {
      const subSlug = encodeURIComponent(slugify(sub.title));
      urls.push({
        url: `${BASE_URL}/category/${catSlug}/${subSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });

      for (const subSub of sub.sub_sub_category) {
        const subSubSlug = encodeURIComponent(slugify(subSub.title));
        urls.push({
          url: `${BASE_URL}/category/${catSlug}/${subSlug}/${subSubSlug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
        });
      }
    }
  }

  return urls;
}
