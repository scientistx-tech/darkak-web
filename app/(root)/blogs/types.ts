export interface BlogResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Blog[];
}

export interface Blog {
  id: number;
  name: string;
  title: string;
  thumbnail: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: {
    keywords: string[];
  };
  meta_image: string;
  meta_alt: string;
  content: string;
  faq: {
    faq: FAQ[];
  };
  date: string; // ISO date string
  published: boolean;
  slug: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CrateBlogType {
  name: string;
  title: string;
  thumbnail: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: {
    keywords: string[];
  };
  meta_image: string;
  meta_alt: string;
  content: string;
  faq: {
    faq: {
      question: string;
      answer: string;
    }[];
  };
}
