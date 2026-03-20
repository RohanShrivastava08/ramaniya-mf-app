import React from 'react';
import { cn } from '../../lib/utils';

export function Section({ children, className, id, bg = "transparent" }) {
  const bgClasses = {
    transparent: "",
    white: "bg-white",
    gray: "bg-slate-50",
    dark: "bg-slate-900 text-white",
    blue: "bg-fintech-blue-50"
  };

  return (
    <section id={id} className={cn("py-20 md:py-28", bgClasses[bg], className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
