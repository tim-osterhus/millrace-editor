import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Alert02Icon,
  GridViewIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type {
  MillraceWorkbenchSnapshot,
  MillraceWorkItem,
  MillraceWorkState,
} from "../types";

type Props = {
  snapshot: MillraceWorkbenchSnapshot;
  activeWorkItemId: string;
  onSelectWorkItem: (id: string) => void;
};

export function WorkItemRail({
  snapshot,
  activeWorkItemId,
  onSelectWorkItem,
}: Props) {
  const activeApprovals = snapshot.approvals.filter(
    (approval) => approval.status === "requested",
  ).length;

  return (
    <section className="flex max-h-[42%] min-h-52 shrink-0 flex-col border-t border-border/60 bg-background/35">
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border/50 px-2.5">
        <HugeiconsIcon
          icon={GridViewIcon}
          size={13}
          strokeWidth={1.75}
          className="text-muted-foreground"
        />
        <span className="min-w-0 flex-1 truncate text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Millrace Work
        </span>
        {activeApprovals > 0 ? (
          <span
            className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 px-1.5 text-[10px] font-medium text-amber-700 dark:text-amber-300"
            title={`${activeApprovals} approval${activeApprovals === 1 ? "" : "s"} requested`}
          >
            {activeApprovals}
          </span>
        ) : null}
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          title="New governed work"
          aria-label="New governed work"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={12} strokeWidth={2} />
        </Button>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-1 p-1.5">
          {snapshot.workItems.map((item) => (
            <WorkItemButton
              key={item.id}
              item={item}
              active={item.id === activeWorkItemId}
              onSelect={() => onSelectWorkItem(item.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}

function WorkItemButton({
  item,
  active,
  onSelect,
}: {
  item: MillraceWorkItem;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex w-full flex-col gap-1 rounded-md border px-2 py-2 text-left transition-colors",
        active
          ? "border-primary/35 bg-primary/10 text-foreground"
          : "border-transparent text-muted-foreground hover:border-border/70 hover:bg-muted/45 hover:text-foreground",
      )}
    >
      <div className="flex min-w-0 items-start gap-2">
        <span
          className={cn(
            "mt-1 size-1.5 shrink-0 rounded-full",
            stateDotClass(item.state),
          )}
        />
        <span className="min-w-0 flex-1 truncate text-[12px] font-medium leading-5">
          {item.title}
        </span>
        {item.state === "needs_approval" ? (
          <HugeiconsIcon
            icon={Alert02Icon}
            size={12}
            strokeWidth={2}
            className="shrink-0 text-amber-600 dark:text-amber-300"
          />
        ) : null}
      </div>
      <div className="line-clamp-2 pl-3.5 text-[11px] leading-4 text-muted-foreground">
        {item.summary}
      </div>
      <div className="flex items-center gap-1.5 pl-3.5 text-[10.5px] text-muted-foreground/85">
        <span>{stateLabel(item.state)}</span>
        {item.queuePosition ? (
          <>
            <span aria-hidden>·</span>
            <span>#{item.queuePosition}</span>
          </>
        ) : null}
        <span aria-hidden>·</span>
        <span className="truncate">{item.branch}</span>
        <span aria-hidden>·</span>
        <span>{timeLabel(item.updatedAt)}</span>
      </div>
    </button>
  );
}

function stateLabel(state: MillraceWorkState): string {
  return state.replace(/_/g, " ");
}

function stateDotClass(state: MillraceWorkState): string {
  switch (state) {
    case "running":
      return "bg-emerald-500";
    case "planning":
    case "queued":
      return "bg-sky-500";
    case "needs_approval":
      return "bg-amber-500";
    case "blocked":
    case "failed":
      return "bg-destructive";
    case "completed":
      return "bg-muted-foreground";
  }
}

function timeLabel(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
