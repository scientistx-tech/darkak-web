const getSeoData = async (type: string) => {
  try {
    const res = await fetch(`https://api.darkak.com.bd/api/public/page-seo/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: Bearer ${process.env.API_TOKEN}, // Uncomment if needed
      },
      // You must disable caching for dynamic SSR data
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch news data');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching news details:', error);
    return null;
  }
};
export default getSeoData