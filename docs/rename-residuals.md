# Rename Residuals

The first Millrace Editor import intentionally preserves several low-level
Terax shell integration identifiers because they are protocol and helper names
inside the PTY integration.

Accepted residuals:

- PTY helper environment variables.
- Shell helper functions.
- OSC open-file helper names.
- Thread names used for log readability.

These can be renamed in a dedicated compatibility pass after the imported
terminal behavior is verified on macOS, Linux, and Windows.
