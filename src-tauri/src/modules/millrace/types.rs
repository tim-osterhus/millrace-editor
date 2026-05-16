#![allow(dead_code)]

// The contract covers the runtime state machine; the M0 fixture only uses a
// subset of variants until the real Millrace backend is connected.
use serde::Serialize;

#[derive(Clone, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum MillraceWorkState {
    Queued,
    Planning,
    Running,
    Blocked,
    NeedsApproval,
    Completed,
    Failed,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum MillraceRiskLevel {
    Low,
    Medium,
    High,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MillraceWorkItem {
    pub id: String,
    pub title: String,
    pub state: MillraceWorkState,
    pub queue_position: Option<u32>,
    pub branch: String,
    pub summary: String,
    pub updated_at: String,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum MillracePlanStepState {
    Pending,
    Running,
    Completed,
    Blocked,
}

#[derive(Clone, Serialize)]
pub struct MillracePlanStep {
    pub id: String,
    pub title: String,
    pub state: MillracePlanStepState,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MillracePlan {
    pub id: String,
    pub work_item_id: String,
    pub title: String,
    pub steps: Vec<MillracePlanStep>,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MillraceTraceEvent {
    pub id: String,
    pub work_item_id: String,
    pub label: String,
    pub detail: String,
    pub at: String,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum MillraceApprovalStatus {
    Requested,
    Approved,
    Denied,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MillraceApproval {
    pub id: String,
    pub work_item_id: String,
    pub label: String,
    pub risk: MillraceRiskLevel,
    pub target: String,
    pub status: MillraceApprovalStatus,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum MillraceLoopPackLifecycleState {
    Preview,
    Validate,
    Compile,
    Apply,
    Run,
    Trace,
    Repair,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MillraceLoopPack {
    pub id: String,
    pub label: String,
    pub lifecycle_state: MillraceLoopPackLifecycleState,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum MillraceEvidenceKind {
    ChangedFile,
    Check,
    Trace,
    TerminalOutcome,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MillraceEvidence {
    pub id: String,
    pub work_item_id: String,
    pub label: String,
    pub kind: MillraceEvidenceKind,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct MillraceWorkbenchSnapshot {
    pub active_work_item_id: String,
    pub work_items: Vec<MillraceWorkItem>,
    pub plans: Vec<MillracePlan>,
    pub traces: Vec<MillraceTraceEvent>,
    pub approvals: Vec<MillraceApproval>,
    pub loop_packs: Vec<MillraceLoopPack>,
    pub evidence: Vec<MillraceEvidence>,
}
