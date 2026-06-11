import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Status badge — soft-стиль: тінт-фон (bg-*-surface) + насичений текст (text-*-foreground).
 * Кольори — ТІЛЬКИ з семантичних токенів, жодних hex. Поміняєш токен у @repo/tokens → зміняться всі badge.
 *
 * Stock-status мапиться так: In stock → success · Low → warning · Out → destructive.
 */
const badgeVariants = cva("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium", {
  variants: {
    tone: {
      info: "bg-info-surface text-info-foreground",
      success: "bg-success-surface text-success-foreground",
      warning: "bg-warning-surface text-warning-foreground",
      destructive: "bg-destructive-surface text-destructive-foreground",
    },
  },
  defaultVariants: { tone: "info" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps): React.ReactElement {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
