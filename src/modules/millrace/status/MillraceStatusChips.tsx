import { cn } from "@/lib/utils";
import { Alert02Icon, GridViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { MillraceApproval, MillraceWorkItem } from "../types";

type Props = {
  activeWorkItem: MillraceWorkItem;
  approvals: MillraceApproval[];
};

export function MillraceStatusChips({ activeWorkItem, approvals }: Props) {
  const waitingApprovals = approvals.filter(
    (approval) => approval.status === "requested",
  );

  return (
    <div className="flex items-center gap-1.5">
      <span
        className="inline-flex h-6 max-w-60 items-center gap-1.5 rounded-md border border-border/70 bg-background/55 px-2 text-[11px]"
        title={activeWorkItem.title}
      >
        <HugeiconsIcon
          icon={GridViewIcon}
          size={11}
          strokeWidth={1.75}
          className="shrink-0 text-muted-foreground"
        />
        <span
          className={cn("size-1.5 shrink-0 rounded-full", {
            "bg-emerald-500": activeWorkItem.state === "running",
            "bg-sky-500":
              activeWorkItem.state === "planning" ||
              activeWorkItem.state === "queued",
            "bg-amber-500": activeWorkItem.state === "needs_approval",
            "bg-destructive":
              activeWorkItem.state === "blocked" ||
              activeWorkItem.state === "failed",
            "bg-muted-foreground": activeWorkItem.state === "completed",
          })}
        />
        <span className="truncate">{activeWorkItem.title}</span>
      </span>

      {waitingApprovals.length ? (
        <span
          className="inline-flex h-6 items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 text-[11px] text-amber-700 dark:text-amber-300"
          title={`${waitingApprovals.length} approval${waitingApprovals.length === 1 ? "" : "s"} requested`}
        >
          <HugeiconsIcon icon={Alert02Icon} size={11} strokeWidth={2} />
          {waitingApprovals.length}
        </span>
      ) : null}
    </div>
  );
}
