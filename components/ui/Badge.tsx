import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "pending" | "approved" | "rejected" | "default" | "live";
  className?: string;
}

const variantStyles = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  approved: "bg-success/20 text-success border-success/30",
  rejected: "bg-danger/20 text-danger border-danger/30",
  default: "bg-surface-high text-silver border-border",
  live: "bg-primary/20 text-primary border-primary/30 animate-glow-pulse",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-chakra uppercase tracking-wider border",
        variantStyles[variant],
        className
      )}
    >
      {variant === "live" && (
        <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
      )}
      {children}
    </span>
  );
}
