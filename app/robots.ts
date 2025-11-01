import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/seller/", "/user/"],
    },
    sitemap: "https://darkak.com.bd/sitemap.xml",
  };
}
