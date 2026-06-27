"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-rajdhani font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-background hover:bg-gold-light hover:shadow-gold-glow",
        secondary:
          "border-2 border-gold text-gold hover:bg-gold/10 hover:shadow-gold-glow",
        ghost:
          "text-gold hover:bg-gold/10",
        danger:
          "bg-danger text-white hover:bg-danger/90",
        success:
          "bg-success text-white hover:bg-success/90",
      },
      size: {
        default: "h-12 px-8 py-3 text-lg rounded-buttons",
        sm: "h-9 px-4 py-2 text-sm rounded-md",
        lg: "h-14 px-10 py-4 text-xl rounded-buttons",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
