import * as React from "react";

import { cn } from "@/utils/cn";

// export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }) => {
        const internalRef = React.useRef<HTMLTextAreaElement>(null);

        // Function to adjust the height of the textarea dynamically
        const adjustHeight = () => {
            const textarea = internalRef.current;
            if (textarea) {
                textarea.style.height = "auto"; // Reset height to auto to shrink if content is removed
                textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
            }
        };

        return (
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-muted bg-muted px-3 py-2 text-sm  placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:border-accent",
                    className,
                    {}
                )}
                ref={internalRef}
                onInput={adjustHeight} // Adjust height dynamically as the user types
                {...props}
            />
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
