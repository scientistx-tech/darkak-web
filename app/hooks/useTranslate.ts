"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/redux/store";

// global in-memory cache { "en|bn|Hello" : "হ্যালো" }
const translationCache = new Map<string, string>();
translationCache.set('bn|FEATURE PRODUCTS', "ফিচার্ড পণ্যসমূহ");
translationCache.set('bn|Shop by Categories', "ক্যাটাগরি অনুযায়ী পণ্য দেখুন");
translationCache.set(`bn|TODAY'S DEAL`, "আজকের ডিল");
export function useTranslate(text: string) {
  const lang = useSelector((state: RootState) => state.language.language);
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    const cacheKey = `${lang}|${text}`;
    

    // ✅ check cache first
    if (translationCache.has(cacheKey)) {
      setTranslated(translationCache.get(cacheKey)!);
      return;
    }

    const translate = async () => {
      if (lang === "en") {
        setTranslated(text); // no translation needed
        return;
      }

      try {
        const res = await fetch("https://translify.vercel.app/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            source_lang: "en",
            target_lang: lang,
          }),
        });

        if (!res.ok) throw new Error("Translation failed");

        const data = await res.json();
        const result = data.translated_text || text;

        // ✅ save to cache
        translationCache.set(cacheKey, result);

        setTranslated(result);
      } catch (err) {
        console.error("Translation error:", err);
        setTranslated(text); // fallback
      }
    };

    translate();
  }, [text, lang]);

  return translated;
}
