import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Card = React.forwardRef(({ className, children, hoverEffect = true, ...props }, ref) => {
  const Component = hoverEffect ? motion.div : 'div';
  
  return (
    <Component
      ref={ref}
      whileHover={hoverEffect ? { y: -5 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm p-6 overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
Card.displayName = "Card";
