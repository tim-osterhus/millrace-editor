import { cn } from "@/lib/utils";
import {
  Alert02Icon,
  CheckmarkCircle01Icon,
  GridViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { MillraceApprovalContext } from "./approvalContext";

type Props = {
  context: MillraceApprovalContext;
};

export function MillraceApprovalSummary({ context }: Props) {
  return (
    <div className="border-b border-border/60 bg-background/35 px-3 py-2">
      <div className="flex items-center gap-2">
        <HugeiconsIcon
          icon={GridViewIcon}
          size={12}
          strokeWidth={1.75}
          className="shrink-0 text-muted-foreground"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[11px] font-medium">
            {context.workItem.title}
          </div>
          <div className="truncate text-[10.5px] text-muted-foreground">
            {context.plan?.title ?? "No plan attached"}
          </div>
        </div>
        <RiskBadge risk={context.risk} />
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5 pl-5 text-[10.5px] text-muted-foreground">
        <span>{context.workItem.id}</span>
        <span aria-hidden>·</span>
        <span>{context.traceCount} trace events</span>
        <span aria-hidden>·</span>
        <span>{context.evidenceCount} evidence items</span>
        {context.approval ? (
          <>
            <span aria-hidden>·</span>
            <span>{context.approval.status}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}

function RiskBadge({ risk }: { risk: MillraceApprovalContext["risk"] }) {
  const highRisk = risk === "high";
  const mediumRisk = risk === "medium";
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center gap-1 rounded-md border px-1.5 text-[10px] uppercase",
        highRisk
          ? "border-destructive/35 bg-destructive/10 text-destructive"
          : mediumRisk
            ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      )}
    >
      <HugeiconsIcon
        icon={highRisk || mediumRisk ? Alert02Icon : CheckmarkCircle01Icon}
        size={10}
        strokeWidth={2}
      />
      {risk}
    </span>
  );
}
