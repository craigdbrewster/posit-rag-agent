import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-semibold ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // GDS Primary button - the main call-to-action
        default: "bg-primary text-primary-foreground hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-warning focus:ring-offset-0 focus:bg-warning focus:text-warning-foreground shadow-[inset_0_-2px_0_rgba(0,0,0,0.1)]",
        // GDS Secondary button - less prominent actions  
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-4 focus:ring-warning focus:ring-offset-0 focus:bg-warning focus:text-warning-foreground border border-border",
        // GDS Warning button - for destructive actions
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:outline-none focus:ring-4 focus:ring-warning focus:ring-offset-0 focus:bg-warning focus:text-warning-foreground shadow-[inset_0_-2px_0_rgba(0,0,0,0.1)]",
        // GDS Success button
        success: "bg-success text-success-foreground hover:bg-success/90 focus:outline-none focus:ring-4 focus:ring-warning focus:ring-offset-0 focus:bg-warning focus:text-warning-foreground shadow-[inset_0_-2px_0_rgba(0,0,0,0.1)]",
        // Outline variant for less prominent actions
        outline: "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-4 focus:ring-warning focus:ring-offset-0 focus:bg-warning focus:text-warning-foreground",
        // Ghost variant
        ghost: "text-primary hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-warning focus:ring-offset-0 focus:bg-warning focus:text-warning-foreground",
        // Link variant
        link: "text-primary underline-offset-4 hover:underline focus:outline-none focus:ring-4 focus:ring-warning focus:ring-offset-0 focus:bg-warning focus:text-warning-foreground",
      },
      size: {
        default: "min-h-[44px] px-4 py-2", // GDS minimum touch target size
        sm: "min-h-[36px] px-3 py-1.5 text-sm",
        lg: "min-h-[52px] px-6 py-3 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
