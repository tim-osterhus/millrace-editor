# Millrace Runtime Bridge

Millrace Editor currently ships an M0 bridge that exposes Millrace workbench state through the same path the real runtime will use.

## Current Contract

The frontend owns the visible workbench model in `src/modules/millrace/types/index.ts`.

The Tauri backend mirrors that contract in `src-tauri/src/modules/millrace/types.rs` and exposes:

```text
millrace_status() -> MillraceWorkbenchSnapshot
```

The frontend wrapper is:

```text
src/modules/millrace/runtime/native.ts
```

At this stage the command returns fixture data from `src-tauri/src/modules/millrace/fixtures.rs`. This keeps the UI, approval cards, composer contract, and status surfaces wired against a stable native boundary before the actual Millrace runtime is embedded.

## Runtime Swap Path

`src-tauri/src/modules/millrace/runtime_bridge.rs` is the intended replacement point.

The next implementation phase should:

1. Replace `MillraceRuntimeMode::Fixture` with a runtime-backed mode.
2. Load or start the Millrace runtime supervisor from the app workspace.
3. Map runtime queue, plan, approval, trace, loop-pack, and evidence records into `MillraceWorkbenchSnapshot`.
4. Add command endpoints for queue actions, approval decisions, pause/resume, retry/repair, and trace expansion.
5. Move the frontend hook from direct fixture reads to `getMillraceStatus()` plus refresh/event subscription.

## Design Constraint

The frontend should keep depending on the Millrace module contract rather than importing runtime-specific backend details. Mission Control, approval cards, composer context, and status chips should all consume the same snapshot shape.
