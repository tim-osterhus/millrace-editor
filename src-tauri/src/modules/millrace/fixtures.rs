use super::types::{
    MillraceApproval, MillraceApprovalStatus, MillraceEvidence, MillraceEvidenceKind,
    MillraceLoopPack, MillraceLoopPackLifecycleState, MillracePlan, MillracePlanStep,
    MillracePlanStepState, MillraceRiskLevel, MillraceTraceEvent, MillraceWorkbenchSnapshot,
    MillraceWorkItem, MillraceWorkState,
};

pub fn fixture_snapshot() -> MillraceWorkbenchSnapshot {
    MillraceWorkbenchSnapshot {
        active_work_item_id: "work-dev-001".into(),
        work_items: vec![
            MillraceWorkItem {
                id: "work-dev-001".into(),
                title: "Wire governed work into the editor".into(),
                state: MillraceWorkState::Running,
                queue_position: Some(1),
                branch: "main".into(),
                summary: "Add fixture-backed Millrace work lifecycle UI to the imported Terax workbench."
                    .into(),
                updated_at: "2026-05-15T21:10:00-10:00".into(),
            },
            MillraceWorkItem {
                id: "work-dev-002".into(),
                title: "Review shell approval trace".into(),
                state: MillraceWorkState::NeedsApproval,
                queue_position: Some(2),
                branch: "main".into(),
                summary:
                    "Show how a risky command is tied to work item, plan, trace, and evidence."
                        .into(),
                updated_at: "2026-05-15T21:12:00-10:00".into(),
            },
            MillraceWorkItem {
                id: "work-dev-003".into(),
                title: "Repair blocked test run".into(),
                state: MillraceWorkState::Blocked,
                queue_position: Some(3),
                branch: "main".into(),
                summary: "Represent a blocked run with a visible repair action and trace context."
                    .into(),
                updated_at: "2026-05-15T21:14:00-10:00".into(),
            },
        ],
        plans: vec![MillracePlan {
            id: "plan-dev-001".into(),
            work_item_id: "work-dev-001".into(),
            title: "Governed workbench fixture plan".into(),
            steps: vec![
                MillracePlanStep {
                    id: "step-1".into(),
                    title: "Import Terax workbench baseline".into(),
                    state: MillracePlanStepState::Completed,
                },
                MillracePlanStep {
                    id: "step-2".into(),
                    title: "Add Millrace typed fixture data".into(),
                    state: MillracePlanStepState::Running,
                },
                MillracePlanStep {
                    id: "step-3".into(),
                    title: "Render work item rail and trace inspector".into(),
                    state: MillracePlanStepState::Pending,
                },
            ],
        }],
        traces: vec![
            MillraceTraceEvent {
                id: "trace-event-001".into(),
                work_item_id: "work-dev-001".into(),
                label: "Plan compiled".into(),
                detail: "Fixture plan associated with active work item.".into(),
                at: "21:10".into(),
            },
            MillraceTraceEvent {
                id: "trace-event-002".into(),
                work_item_id: "work-dev-001".into(),
                label: "Approval requested".into(),
                detail: "Shell command requires operator approval before execution.".into(),
                at: "21:12".into(),
            },
        ],
        approvals: vec![MillraceApproval {
            id: "approval-001".into(),
            work_item_id: "work-dev-002".into(),
            label: "Run shell command".into(),
            risk: MillraceRiskLevel::Medium,
            target: "pnpm exec tsc --noEmit".into(),
            status: MillraceApprovalStatus::Requested,
        }],
        loop_packs: vec![
            MillraceLoopPack {
                id: "loop-dev".into(),
                label: "dev".into(),
                lifecycle_state: MillraceLoopPackLifecycleState::Validate,
            },
            MillraceLoopPack {
                id: "loop-context-summary".into(),
                label: "context_summary".into(),
                lifecycle_state: MillraceLoopPackLifecycleState::Preview,
            },
        ],
        evidence: vec![
            MillraceEvidence {
                id: "evidence-001".into(),
                work_item_id: "work-dev-001".into(),
                label: "src/modules/millrace/types/index.ts".into(),
                kind: MillraceEvidenceKind::ChangedFile,
            },
            MillraceEvidence {
                id: "evidence-002".into(),
                work_item_id: "work-dev-001".into(),
                label: "TypeScript check pending".into(),
                kind: MillraceEvidenceKind::Check,
            },
        ],
    }
}
