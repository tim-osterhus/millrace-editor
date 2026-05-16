import { MILLRACE_WORKBENCH_FIXTURE } from "../fixtures/workbenchFixture";
import type {
  MillraceApproval,
  MillracePlan,
  MillraceRiskLevel,
  MillraceWorkItem,
} from "../types";

export type MillraceApprovalContext = {
  workItem: MillraceWorkItem;
  approval: MillraceApproval | null;
  plan: MillracePlan | null;
  traceCount: number;
  evidenceCount: number;
  risk: MillraceRiskLevel;
};

export function getFixtureApprovalContext(
  toolName: string,
  input: Record<string, unknown>,
): MillraceApprovalContext {
  const approval = findMatchingApproval(toolName, input);
  const workItem =
    (approval
      ? MILLRACE_WORKBENCH_FIXTURE.workItems.find(
          (item) => item.id === approval.workItemId,
        )
      : null) ??
    MILLRACE_WORKBENCH_FIXTURE.workItems.find(
      (item) => item.id === MILLRACE_WORKBENCH_FIXTURE.activeWorkItemId,
    ) ??
    MILLRACE_WORKBENCH_FIXTURE.workItems[0];

  return {
    workItem,
    approval,
    plan:
      MILLRACE_WORKBENCH_FIXTURE.plans.find(
        (plan) => plan.workItemId === workItem.id,
      ) ?? null,
    traceCount: MILLRACE_WORKBENCH_FIXTURE.traces.filter(
      (event) => event.workItemId === workItem.id,
    ).length,
    evidenceCount: MILLRACE_WORKBENCH_FIXTURE.evidence.filter(
      (item) => item.workItemId === workItem.id,
    ).length,
    risk: approval?.risk ?? inferRisk(toolName, input),
  };
}

function findMatchingApproval(
  toolName: string,
  input: Record<string, unknown>,
): MillraceApproval | null {
  if (toolName === "bash_run" || toolName === "bash_background") {
    const command = typeof input.command === "string" ? input.command : "";
    return (
      MILLRACE_WORKBENCH_FIXTURE.approvals.find(
        (approval) =>
          approval.status === "requested" &&
          command.length > 0 &&
          approval.target.includes(command),
      ) ??
      MILLRACE_WORKBENCH_FIXTURE.approvals.find(
        (approval) => approval.status === "requested",
      ) ??
      null
    );
  }
  return (
    MILLRACE_WORKBENCH_FIXTURE.approvals.find(
      (approval) => approval.status === "requested",
    ) ?? null
  );
}

function inferRisk(
  toolName: string,
  input: Record<string, unknown>,
): MillraceRiskLevel {
  if (toolName === "bash_run" || toolName === "bash_background") {
    const command = typeof input.command === "string" ? input.command : "";
    if (/\b(rm|sudo|chmod|chown|mv)\b/.test(command)) return "high";
    return "medium";
  }
  if (toolName === "multi_edit") return "medium";
  return "low";
}
