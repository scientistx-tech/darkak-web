"use client"
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLink({
    href,
    children,
    className,
}: {
    href: string;
    children?: React.ReactNode;
    className?: string
}) {
    const pathname = usePathname()
    const isActive = (url: string) => url === pathname
    return (
        <Link
            className={cn(` relative text-center font-montserrat text-white ${isActive(href) ? "opacity-100" : "opacity-70"}`, className)}
            href={href}
        >
            {children}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-white"
                initial={{ width: 0 }}
                animate={{ width: isActive(href) ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
        </Link>
    );
}