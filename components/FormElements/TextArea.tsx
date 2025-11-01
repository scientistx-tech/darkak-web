import { cn } from "@/lib/utils";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    required?: boolean;
    className?: string;
    error?: string | undefined;
    rows?: number
};

function TextArea({ label, required, className, rows = 3, error, ...props }: Props) {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {/* Label */}
            {label && (
                <label className="text-md flex items-center gap-1 font-medium">
                    {label}
                    {required && <span className="text-red-600">*</span>}
                </label>
            )}

            {/* Input Field */}
            <textarea
                className="textarea px-2 py-1 rounded-md bordered border border-gray-300 bg-slate-100 dark:bg-dark-2"
                rows={rows}
                {...props}
            />
            {error && <span className="text-red-600">{error}</span>}
        </div>
    );
}

export default TextArea;