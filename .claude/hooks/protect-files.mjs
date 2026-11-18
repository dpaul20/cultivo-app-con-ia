// PreToolUse hook: block direct edits to env files and the npm lockfile.
import { basename } from "node:path";

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let filePath = "";
  try {
    filePath = JSON.parse(raw)?.tool_input?.file_path ?? "";
  } catch {
    process.exit(0);
  }
  const name = basename(filePath);
  if (name.startsWith(".env") && name !== ".env.example") {
    console.error(`Blocked: ${name} holds secrets. Ask the user to edit it manually.`);
    process.exit(2);
  }
  if (name === "package-lock.json") {
    console.error("Blocked: package-lock.json is generated. Use npm install/uninstall instead.");
    process.exit(2);
  }
  process.exit(0);
});
