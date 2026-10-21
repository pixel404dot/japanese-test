import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,box-shadow,background-color,color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 active:scale-[0.96] [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-fg hover:opacity-90",
        secondary:
          "bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
        ghost: "text-muted hover:bg-elevated hover:text-fg",
      },
      size: {
        default: "h-11 rounded-md px-5 text-sm",
        lg: "h-12 rounded-lg px-6 text-base",
        sm: "h-9 rounded-sm px-3 text-sm",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
