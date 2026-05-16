import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Alert02Icon,
  CheckmarkCircle01Icon,
  GitCompareIcon,
  TerminalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactNode } from "react";
import type {
  MillraceApproval,
  MillraceEvidence,
  MillraceLoopPack,
  MillracePlan,
  MillracePlanStep,
  MillraceTraceEvent,
  MillraceWorkItem,
} from "../types";

type Props = {
  activeWorkItem: MillraceWorkItem;
  plan: MillracePlan | null;
  traceEvents: MillraceTraceEvent[];
  approvals: MillraceApproval[];
  evidence: MillraceEvidence[];
  loopPacks: MillraceLoopPack[];
};

export function PlanTraceInspector({
  activeWorkItem,
  plan,
  traceEvents,
  approvals,
  evidence,
  loopPacks,
}: Props) {
  return (
    <aside className="hidden w-[320px] min-w-[280px] max-w-[360px] shrink-0 flex-col border-l border-border/60 bg-card/35 xl:flex">
      <div className="shrink-0 border-b border-border/60 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12px] font-medium">
              {activeWorkItem.title}
            </div>
            <div className="truncate text-[10.5px] text-muted-foreground">
              {activeWorkItem.id} · {activeWorkItem.branch}
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-4 p-3">
          <InspectorSection title="Plan">
            {plan ? (
              <div className="space-y-1.5">
                <div className="text-[11px] font-medium text-muted-foreground">
                  {plan.title}
                </div>
                {plan.steps.map((step) => (
                  <PlanStepRow key={step.id} step={step} />
                ))}
              </div>
            ) : (
              <EmptyLine>No plan is attached to this work item.</EmptyLine>
            )}
          </InspectorSection>

          <InspectorSection
            title="Approvals"
            action={
              approvals.length ? (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] text-amber-700 dark:text-amber-300">
                  {approvals.length}
                </span>
              ) : null
            }
          >
            {approvals.length ? (
              <div className="space-y-1.5">
                {approvals.map((approval) => (
                  <div
                    key={approval.id}
                    className="rounded-md border border-border/70 bg-background/60 p-2"
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-medium">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        size={12}
                        strokeWidth={2}
                        className="text-amber-600 dark:text-amber-300"
                      />
                      <span className="min-w-0 flex-1 truncate">
                        {approval.label}
                      </span>
                      <span className="text-[10px] uppercase text-muted-foreground">
                        {approval.risk}
                      </span>
                    </div>
                    <div className="mt-1 truncate font-mono text-[10.5px] text-muted-foreground">
                      {approval.target}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyLine>No approval is waiting.</EmptyLine>
            )}
          </InspectorSection>

          <InspectorSection title="Trace">
            {traceEvents.length ? (
              <div className="space-y-2">
                {traceEvents.map((event) => (
                  <div key={event.id} className="flex gap-2">
                    <div className="flex w-8 shrink-0 justify-end font-mono text-[10px] text-muted-foreground">
                      {event.at}
                    </div>
                    <div className="min-w-0 flex-1 border-l border-border/60 pl-2">
                      <div className="truncate text-[11px] font-medium">
                        {event.label}
                      </div>
                      <div className="text-[10.5px] leading-4 text-muted-foreground">
                        {event.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyLine>No trace events yet.</EmptyLine>
            )}
          </InspectorSection>

          <InspectorSection title="Evidence">
            {evidence.length ? (
              <div className="space-y-1">
                {evidence.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 rounded-md border border-border/50 bg-background/45 px-2 py-1.5"
                  >
                    <HugeiconsIcon
                      icon={
                        item.kind === "changed_file"
                          ? GitCompareIcon
                          : TerminalIcon
                      }
                      size={12}
                      strokeWidth={1.75}
                      className="shrink-0 text-muted-foreground"
                    />
                    <span className="min-w-0 flex-1 truncate text-[11px]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyLine>No evidence captured.</EmptyLine>
            )}
          </InspectorSection>

          <InspectorSection title="Loop Packs">
            <div className="flex flex-wrap gap-1">
              {loopPacks.map((loop) => (
                <span
                  key={loop.id}
                  className="rounded-md border border-border/70 bg-background/60 px-1.5 py-1 text-[10.5px]"
                  title={loop.lifecycleState}
                >
                  {loop.label}
                </span>
              ))}
            </div>
          </InspectorSection>

          <Button
            type="button"
            variant="outline"
            size="xs"
            className="w-full"
          >
            <HugeiconsIcon icon={TerminalIcon} size={12} strokeWidth={2} />
            Open Mission Control
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
}

function InspectorSection({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="text-[10.5px] font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function PlanStepRow({ step }: { step: MillracePlanStep }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border/50 bg-background/45 px-2 py-1.5">
      <HugeiconsIcon
        icon={CheckmarkCircle01Icon}
        size={12}
        strokeWidth={1.75}
        className={cn(
          "shrink-0",
          step.state === "completed"
            ? "text-emerald-500"
            : step.state === "running"
              ? "text-sky-500"
              : step.state === "blocked"
                ? "text-destructive"
                : "text-muted-foreground/70",
        )}
      />
      <span className="min-w-0 flex-1 truncate text-[11px]">{step.title}</span>
      <span className="text-[10px] text-muted-foreground">{step.state}</span>
    </div>
  );
}

function EmptyLine({ children }: { children: ReactNode }) {
  return <div className="text-[11px] text-muted-foreground">{children}</div>;
}
