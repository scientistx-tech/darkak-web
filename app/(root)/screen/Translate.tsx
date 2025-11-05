// Translate.tsx
"use client"
import { useTranslate } from "@/app/hooks/useTranslate";
import React from "react";

interface TranslateProps {
    text: string;
}

export const Translate: React.FC<TranslateProps> = ({ text }) => {
    const translated = useTranslate(text);
    return <>{translated}</>;
};