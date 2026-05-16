import { invoke } from "@tauri-apps/api/core";
import type { MillraceWorkbenchSnapshot } from "../types";

export function getMillraceStatus(): Promise<MillraceWorkbenchSnapshot> {
  return invoke<MillraceWorkbenchSnapshot>("millrace_status");
}
