use super::fixtures::fixture_snapshot;
use super::runtime_bridge::{runtime_mode, MillraceRuntimeMode};
use super::types::MillraceWorkbenchSnapshot;

#[tauri::command]
pub fn millrace_status() -> Result<MillraceWorkbenchSnapshot, String> {
    match runtime_mode() {
        MillraceRuntimeMode::Fixture => Ok(fixture_snapshot()),
    }
}
