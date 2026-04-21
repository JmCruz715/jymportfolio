import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl border border-border/70 text-sm font-semibold text-foreground ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[linear-gradient(180deg,hsl(var(--background)/0.62),hsl(var(--secondary)/0.36))] shadow-[inset_0_1px_0_hsl(var(--foreground)/0.08),0_14px_30px_hsl(var(--foreground)/0.08)] hover:border-primary/35 hover:bg-[linear-gradient(180deg,hsl(var(--background)/0.72),hsl(var(--secondary)/0.48))] hover:shadow-[inset_0_1px_0_hsl(var(--foreground)/0.12),0_16px_32px_hsl(var(--primary)/0.14)]",
        destructive: "bg-[linear-gradient(180deg,hsl(var(--destructive)/0.86),hsl(var(--destructive)/0.68))] text-destructive-foreground shadow-[inset_0_1px_0_hsl(var(--destructive-foreground)/0.2),0_18px_36px_hsl(var(--destructive)/0.22)] hover:border-destructive/50",
        outline: "bg-[linear-gradient(180deg,hsl(var(--background)/0.52),hsl(var(--background)/0.3))] hover:border-accent/35 hover:bg-[linear-gradient(180deg,hsl(var(--background)/0.68),hsl(var(--secondary)/0.34))]",
        secondary: "bg-[linear-gradient(180deg,hsl(var(--secondary)/0.82),hsl(var(--secondary)/0.54))] text-secondary-foreground shadow-[inset_0_1px_0_hsl(var(--foreground)/0.08),0_14px_30px_hsl(var(--foreground)/0.08)] hover:border-primary/25",
        ghost: "border-transparent bg-transparent shadow-none hover:border-border/60 hover:bg-[linear-gradient(180deg,hsl(var(--background)/0.48),hsl(var(--secondary)/0.24))]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-10 px-4",
        lg: "h-12 px-8",
        icon: "h-11 w-11 rounded-full p-0",
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
