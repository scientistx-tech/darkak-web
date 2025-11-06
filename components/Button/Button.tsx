import { cn } from "@/lib/utils";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    Icon?: React.ReactNode;
    mode?: "contained" | "outline" | "dashed" | "link";
    className?: string;
    loading?: boolean;
    disabled?: boolean;
};

function Button({
    children,
    className,
    mode = "contained", // Default mode set to "contained"
    loading,
    disabled,
    Icon,
    ...props
}: Props) {
    return (
        <button
            {...props}
            disabled={loading || disabled}
            className={cn(
                "rounded-lg bg-primary px-6 py-[9px] font-medium text-gray-2 hover:bg-opacity-90",
                className,
            )}
        >
            {loading && <span className="loading loading-spinner"></span>}
            {Icon && <span className="mr-2">{Icon}</span>}
            {children}
        </button>
    );
}

export default Button;