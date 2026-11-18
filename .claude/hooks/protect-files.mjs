// PreToolUse hook: block direct edits to env files and the npm lockfile.
// Names are compared case-insensitively (Windows/macOS filesystems are
// case-insensitive) and resolved to their real path when the file exists,
// so aliases such as 8.3 short names cannot bypass the check.
import { existsSync, realpathSync } from "node:fs";
import { basename, resolve } from "node:path";

function realName(filePath) {
  let full = resolve(filePath);
  if (existsSync(full)) {
    // Throws for an existing file whose real path cannot be read; the caller
    // treats that as a block (fail closed).
    full = realpathSync.native(full);
  }
  // Windows ignores NTFS stream suffixes (":stream") and trailing dots/spaces,
  // so ".env.local:x" or "package-lock.json." would write the protected file.
  return basename(full)
    .split(":")[0]
    .replace(/[. ]+$/, "")
    .toLowerCase();
}

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let filePath;
  try {
    filePath = JSON.parse(raw)?.tool_input?.file_path;
  } catch {
    console.error("Blocked: protect-files hook could not parse its input.");
    process.exit(2);
  }
  if (!filePath) process.exit(0);

  let name;
  try {
    name = realName(filePath);
  } catch {
    console.error(`Blocked: could not resolve the real path of ${filePath}.`);
    process.exit(2);
  }
  if (name.startsWith(".env") && name !== ".env.example") {
    console.error(`Blocked: ${basename(filePath)} holds secrets. Ask the user to edit it manually.`);
    process.exit(2);
  }
  if (name === "package-lock.json") {
    console.error("Blocked: package-lock.json is generated. Use npm install/uninstall instead.");
    process.exit(2);
  }
  process.exit(0);
});
