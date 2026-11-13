#!/bin/bash
# PostToolUse hook: runs ESLint on the file Claude just edited and reports problems back.
# Exit code 2 sends stderr to Claude so it can fix the issues; it never blocks the edit itself.
set -uo pipefail

file=$(jq -r '.tool_input.file_path // empty')
case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs) ;;
  *) exit 0 ;;
esac
[ -f "$file" ] || exit 0
cd "${CLAUDE_PROJECT_DIR:-.}"
[ -d node_modules ] || exit 0

if ! out=$(npx --no-install eslint --no-warn-ignored "$file" 2>&1); then
  echo "ESLint encontró problemas en $file:" >&2
  echo "$out" >&2
  exit 2
fi
exit 0
