// categoryTypes.ts

export interface SubSubCategory {
  id: number;
  title: string;
  subCategoryId: number;
  categoryId: number;
  slug:string
}

export interface SubCategory {
  id: number;
  title: string;
  categoryId: number;
  slug:string
  sub_sub_category: SubSubCategory[];
}

export interface Category {
  id: number;
  title: string;
  icon: string;
  slug:string
  serial: number;
  isActive: boolean;
  sub_category: SubCategory[];
}

// Export all together if needed
