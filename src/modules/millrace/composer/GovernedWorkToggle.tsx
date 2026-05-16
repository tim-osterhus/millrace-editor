import { Switch } from "@/components/ui/switch";
import { Alert02Icon, GridViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { MILLRACE_WORKBENCH_FIXTURE } from "../fixtures/workbenchFixture";

type Props = {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
};

export function GovernedWorkToggle({ enabled, onEnabledChange }: Props) {
  const activeWorkItem =
    MILLRACE_WORKBENCH_FIXTURE.workItems.find(
      (item) => item.id === MILLRACE_WORKBENCH_FIXTURE.activeWorkItemId,
    ) ?? MILLRACE_WORKBENCH_FIXTURE.workItems[0];
  const approvalCount = MILLRACE_WORKBENCH_FIXTURE.approvals.filter(
    (approval) => approval.status === "requested",
  ).length;

  return (
    <div className="flex items-center gap-2 rounded-md border border-border/60 bg-background/40 px-2 py-1.5">
      <HugeiconsIcon
        icon={GridViewIcon}
        size={12}
        strokeWidth={1.75}
        className="shrink-0 text-muted-foreground"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11px] font-medium">
          Governed work context
        </div>
        <div className="truncate text-[10.5px] text-muted-foreground">
          {activeWorkItem.title}
        </div>
      </div>
      {approvalCount ? (
        <span
          className="inline-flex h-5 items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 text-[10px] text-amber-700 dark:text-amber-300"
          title={`${approvalCount} approval${approvalCount === 1 ? "" : "s"} requested`}
        >
          <HugeiconsIcon icon={Alert02Icon} size={10} strokeWidth={2} />
          {approvalCount}
        </span>
      ) : null}
      <Switch
        size="sm"
        checked={enabled}
        onCheckedChange={onEnabledChange}
        aria-label="Attach governed work context"
      />
    </div>
  );
}
