export interface SortItem {
  value: string;
  name: string;
}

// Common sorting options that can be reused across different components
export const DEFAULT_SORTING_OPTIONS: SortItem[] = [
  {
    value: "newer",
    name: "Newer",
  },
  {
    value: "popular",
    name: "Popular",
  },
  {
    value: "older",
    name: "Older",
  },
  {
    value: "low-to-high",
    name: "Low to High Price",
  },
  {
    value: "high-to-low",
    name: "High to Low Price",
  },
];

/**
 * Calculate discounted price for a product
 */
function calculateDiscountedPrice(item: any): number {
  const price = parseFloat(item.price) || 0;
  const discount = parseFloat(item.discount) || 0;
  const discountType = item.discount_type;
  
  if (discountType === 'percentage') {
    return price - (price * discount / 100);
  } else if (discountType === 'fixed') {
    return price - discount;
  }
  
  return price;
}

/**
 * Calculate popularity score based on your product data structure
 */
function calculatePopularityScore(item: any): number {
  const avgRate = parseFloat(item.avgRate) || 0;
  const totalReview = parseInt(item.totalReview) || 0;
  const stock = parseInt(item.stock) || 0;
  const deal = item.deal ? 1 : 0;
  const feature = item.feature ? 1 : 0;
  
  // Create a composite popularity score based on available data
  let score = 0;
  
  // Rating contribution (0-100 points)
  score += avgRate * 20; // 5 stars = 100 points
  
  // Review count contribution (0-50 points, capped)
  score += Math.min(totalReview * 2, 50);
  
  // Deal and feature bonuses
  score += deal * 15; // Deal items get 15 bonus points
  score += feature * 10; // Featured items get 10 bonus points
  
  // Stock-based popularity (lower stock might indicate higher demand)
  if (stock < 5) {
    score += (5 - stock) * 3; // Low stock bonus
  }
  
  // Recent products get a small boost
  const createdDate = new Date(item.date);
  const now = new Date();
  const daysSinceCreated = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSinceCreated < 30) {
    score += (30 - daysSinceCreated) * 0.5; // Small boost for recent products
  }
  
  return score;
}

/**
 * Generic sorting function that can handle different data types
 * @param items - Array of items to sort
 * @param sortType - Type of sorting to apply
 * @param customFields - Custom field mappings for specific data structures
 */
export function sortItems<T = any>(
  items: T[], 
  sortType: string, 
  customFields?: {
    dateField?: keyof T | string[];
    priceField?: keyof T | string[];
    popularityField?: keyof T | string[];
    ratingField?: keyof T | string[];
    nameField?: keyof T | string[];
  }
): T[] {
  if (!items || items.length === 0) return [];
  
  const sortedItems = [...items];
  
  // Helper function to get field value with fallback options
  const getFieldValue = (item: any, fieldOptions: keyof T | string[] | undefined, defaultFields: string[]) => {
    if (!fieldOptions) fieldOptions = defaultFields;
    
    const fields = Array.isArray(fieldOptions) ? fieldOptions : [fieldOptions as string];
    
    for (const field of fields) {
      const value = item[field];
      if (value !== undefined && value !== null && value !== '') {
        return value;
      }
    }
    return null;
  };

  console.log(`[Sorting] Applying sort: ${sortType} to ${items.length} items`);

  switch (sortType) {
    case "newer":
      return sortedItems.sort((a, b) => {
        const dateA = getFieldValue(a, customFields?.dateField, ['date', 'createdAt', 'created_at', 'publishedAt']);
        const dateB = getFieldValue(b, customFields?.dateField, ['date', 'createdAt', 'created_at', 'publishedAt']);
        
        if (!dateA || !dateB) {
          console.warn('[Sorting] Missing date field for newer sort');
          return 0;
        }
        
        const timestampA = new Date(dateA).getTime();
        const timestampB = new Date(dateB).getTime();
        
        return timestampB - timestampA; // Newest first
      });
    
    case "older":
      return sortedItems.sort((a, b) => {
        const dateA = getFieldValue(a, customFields?.dateField, ['date', 'createdAt', 'created_at', 'publishedAt']);
        const dateB = getFieldValue(b, customFields?.dateField, ['date', 'createdAt', 'created_at', 'publishedAt']);
        
        if (!dateA || !dateB) {
          console.warn('[Sorting] Missing date field for older sort');
          return 0;
        }
        
        const timestampA = new Date(dateA).getTime();
        const timestampB = new Date(dateB).getTime();
        
        return timestampA - timestampB; // Oldest first
      });
    
    case "popular":
      return sortedItems.sort((a, b) => {
        // Try to get popularity from custom fields first
        let popularityA = getFieldValue(a, customFields?.popularityField, ['popularity', 'views', 'sales', 'viewCount', 'salesCount']);
        let popularityB = getFieldValue(b, customFields?.popularityField, ['popularity', 'views', 'sales', 'viewCount', 'salesCount']);
        
        // If no dedicated popularity field found, calculate based on available data
        if (popularityA === null && popularityB === null) {
          popularityA = calculatePopularityScore(a);
          popularityB = calculatePopularityScore(b);
        } else {
          popularityA = parseFloat(popularityA) || 0;
          popularityB = parseFloat(popularityB) || 0;
        }
        
        console.log(`[Sorting] Popularity - A: ${popularityA}, B: ${popularityB}`);
        return popularityB - popularityA; // Most popular first
      });
    
    case "low-to-high":
      return sortedItems.sort((a, b) => {
        // Use discounted price calculation for accurate sorting
        const priceA = calculateDiscountedPrice(a);
        const priceB = calculateDiscountedPrice(b);
        
        console.log(`[Sorting] Price L2H - A: ${priceA}, B: ${priceB}`);
        return priceA - priceB; // Lowest price first
      });
    
    case "high-to-low":
      return sortedItems.sort((a, b) => {
        // Use discounted price calculation for accurate sorting
        const priceA = calculateDiscountedPrice(a);
        const priceB = calculateDiscountedPrice(b);
        
        console.log(`[Sorting] Price H2L - A: ${priceA}, B: ${priceB}`);
        return priceB - priceA; // Highest price first
      });
      
    default:
      console.log(`[Sorting] Unknown sort type: ${sortType}, returning original order`);
      return sortedItems;
  }
}

/**
 * Hook for managing sort state with URL synchronization
 */
export function useSortingState(
  searchParams: URLSearchParams,
  router: any,
  defaultSort: string = "newer"
) {
  const sortParam = searchParams.get("sort") || defaultSort;
  
  const updateSortInURL = (sortValue: string, resetPage: boolean = true) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort", sortValue);
    
    if (resetPage) {
      newParams.set("page", "1");
    }
    
    router.push(`${window.location.pathname}?${newParams.toString()}`);
  };
  
  return {
    currentSort: sortParam,
    updateSort: updateSortInURL
  };
}

// Debug function to test sorting with your data
export function debugSorting(products: any[]) {
  console.log("=== SORTING DEBUG ===");
  console.log("Total products:", products.length);
  
  if (products.length > 0) {
    const sample = products[0];
    console.log("Sample product fields:", {
      id: sample.id,
      date: sample.date,
      price: sample.price,
      avgRate: sample.avgRate,
      totalReview: sample.totalReview,
      deal: sample.deal,
      feature: sample.feature,
      discount: sample.discount,
      discount_type: sample.discount_type
    });
    
    // Test each sort type
    ['newer', 'older', 'popular', 'low-to-high', 'high-to-low'].forEach(sortType => {
      const sorted = sortItems(products, sortType, {
        dateField: ['date'],
        priceField: ['price'],
        popularityField: ['viewCount', 'salesCount'],
        ratingField: ['avgRate']
      });
      
      console.log(`${sortType.toUpperCase()} - First 3:`, 
        sorted.slice(0, 3).map(p => ({
          id: p.id,
          date: p.date,
          price: p.price,
          finalPrice: calculateDiscountedPrice(p),
          popularity: calculatePopularityScore(p)
        }))
      );
    });
  }
}