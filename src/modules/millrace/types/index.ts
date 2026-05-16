export type MillraceWorkState =
  | "queued"
  | "planning"
  | "running"
  | "blocked"
  | "needs_approval"
  | "completed"
  | "failed";

export type MillraceRiskLevel = "low" | "medium" | "high";

export type MillraceWorkItem = {
  id: string;
  title: string;
  state: MillraceWorkState;
  queuePosition: number | null;
  branch: string;
  summary: string;
  updatedAt: string;
};

export type MillracePlanStep = {
  id: string;
  title: string;
  state: "pending" | "running" | "completed" | "blocked";
};

export type MillracePlan = {
  id: string;
  workItemId: string;
  title: string;
  steps: MillracePlanStep[];
};

export type MillraceTraceEvent = {
  id: string;
  workItemId: string;
  label: string;
  detail: string;
  at: string;
};

export type MillraceApproval = {
  id: string;
  workItemId: string;
  label: string;
  risk: MillraceRiskLevel;
  target: string;
  status: "requested" | "approved" | "denied";
};

export type MillraceLoopPack = {
  id: string;
  label: string;
  lifecycleState:
    | "preview"
    | "validate"
    | "compile"
    | "apply"
    | "run"
    | "trace"
    | "repair";
};

export type MillraceEvidence = {
  id: string;
  workItemId: string;
  label: string;
  kind: "changed_file" | "check" | "trace" | "terminal_outcome";
};

export type MillraceWorkbenchSnapshot = {
  activeWorkItemId: string;
  workItems: MillraceWorkItem[];
  plans: MillracePlan[];
  traces: MillraceTraceEvent[];
  approvals: MillraceApproval[];
  loopPacks: MillraceLoopPack[];
  evidence: MillraceEvidence[];
};
