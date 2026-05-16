import { useMemo, useState } from "react";
import { MILLRACE_WORKBENCH_FIXTURE } from "../fixtures/workbenchFixture";
import type { MillraceWorkbenchSnapshot } from "../types";

export function useMillraceWorkbench() {
  const [activeWorkItemId, setActiveWorkItemId] = useState(
    MILLRACE_WORKBENCH_FIXTURE.activeWorkItemId,
  );

  return useMemo(() => {
    const snapshot: MillraceWorkbenchSnapshot = {
      ...MILLRACE_WORKBENCH_FIXTURE,
      activeWorkItemId,
    };
    const activeWorkItem =
      snapshot.workItems.find((item) => item.id === activeWorkItemId) ??
      snapshot.workItems[0];
    const activePlan =
      snapshot.plans.find((plan) => plan.workItemId === activeWorkItem.id) ??
      null;
    const traceEvents = snapshot.traces.filter(
      (event) => event.workItemId === activeWorkItem.id,
    );
    const approvals = snapshot.approvals.filter(
      (approval) => approval.workItemId === activeWorkItem.id,
    );
    const evidence = snapshot.evidence.filter(
      (item) => item.workItemId === activeWorkItem.id,
    );

    return {
      snapshot,
      activeWorkItem,
      activePlan,
      traceEvents,
      approvals,
      evidence,
      setActiveWorkItemId,
    };
  }, [activeWorkItemId]);
}
