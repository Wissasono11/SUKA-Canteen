import * as React from "react";

export const Checkbox = React.forwardRef(
    ({ className, checked, onCheckedChange, ...props }, ref) => {
        return (
            <input
                type="checkbox"
                ref={ref}
                className={`peer h-5 w-5 shrink-0 rounded border border-primary bg-white checked:bg-primary checked:border-  focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:pointer-events-none ${
                    className || ""
                }`}
                checked={checked}
                onChange={(e) => onCheckedChange?.(e.target.checked)}
                {...props}
            />
        );
    }
);

Checkbox.displayName = "Checkbox";
