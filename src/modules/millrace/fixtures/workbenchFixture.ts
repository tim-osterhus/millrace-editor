import type { MillraceWorkbenchSnapshot } from "../types";

export const MILLRACE_WORKBENCH_FIXTURE: MillraceWorkbenchSnapshot = {
  activeWorkItemId: "work-dev-001",
  workItems: [
    {
      id: "work-dev-001",
      title: "Wire governed work into the editor",
      state: "running",
      queuePosition: 1,
      branch: "main",
      summary:
        "Add fixture-backed Millrace work lifecycle UI to the imported Terax workbench.",
      updatedAt: "2026-05-15T21:10:00-10:00",
    },
    {
      id: "work-dev-002",
      title: "Review shell approval trace",
      state: "needs_approval",
      queuePosition: 2,
      branch: "main",
      summary:
        "Show how a risky command is tied to work item, plan, trace, and evidence.",
      updatedAt: "2026-05-15T21:12:00-10:00",
    },
    {
      id: "work-dev-003",
      title: "Repair blocked test run",
      state: "blocked",
      queuePosition: 3,
      branch: "main",
      summary:
        "Represent a blocked run with a visible repair action and trace context.",
      updatedAt: "2026-05-15T21:14:00-10:00",
    },
  ],
  plans: [
    {
      id: "plan-dev-001",
      workItemId: "work-dev-001",
      title: "Governed workbench fixture plan",
      steps: [
        {
          id: "step-1",
          title: "Import Terax workbench baseline",
          state: "completed",
        },
        {
          id: "step-2",
          title: "Add Millrace typed fixture data",
          state: "running",
        },
        {
          id: "step-3",
          title: "Render work item rail and trace inspector",
          state: "pending",
        },
      ],
    },
  ],
  traces: [
    {
      id: "trace-event-001",
      workItemId: "work-dev-001",
      label: "Plan compiled",
      detail: "Fixture plan associated with active work item.",
      at: "21:10",
    },
    {
      id: "trace-event-002",
      workItemId: "work-dev-001",
      label: "Approval requested",
      detail: "Shell command requires operator approval before execution.",
      at: "21:12",
    },
  ],
  approvals: [
    {
      id: "approval-001",
      workItemId: "work-dev-002",
      label: "Run shell command",
      risk: "medium",
      target: "pnpm exec tsc --noEmit",
      status: "requested",
    },
  ],
  loopPacks: [
    {
      id: "loop-dev",
      label: "dev",
      lifecycleState: "validate",
    },
    {
      id: "loop-context-summary",
      label: "context_summary",
      lifecycleState: "preview",
    },
  ],
  evidence: [
    {
      id: "evidence-001",
      workItemId: "work-dev-001",
      label: "src/modules/millrace/types/index.ts",
      kind: "changed_file",
    },
    {
      id: "evidence-002",
      workItemId: "work-dev-001",
      label: "TypeScript check pending",
      kind: "check",
    },
  ],
};
