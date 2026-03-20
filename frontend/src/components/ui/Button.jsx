import React from 'react';
import { cn } from "../../lib/utils";

export const Button = React.forwardRef(({ className, variant = "primary", size = "default", children, ...props }, ref) => {
  const variants = {
    primary: "bg-fintech-green-600 text-white hover:bg-fintech-green-700 shadow-sm transition-colors",
    secondary: "bg-fintech-blue-100 text-fintech-blue-800 hover:bg-fintech-blue-200 transition-colors",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-fintech-green-600 hover:text-fintech-green-700 transition-colors",
    ghost: "text-slate-600 hover:bg-slate-100 transition-colors"
  };
  
  const sizes = {
    default: "h-11 px-5 py-2",
    sm: "h-9 px-3 text-sm",
    lg: "h-14 px-8 text-lg font-medium",
    icon: "h-11 w-11 flex items-center justify-center p-0"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fintech-green-500 disabled:pointer-events-none disabled:opacity-50 transition-all",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";
