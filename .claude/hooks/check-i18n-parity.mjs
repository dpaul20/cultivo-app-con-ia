// PostToolUse hook: after editing a messages/*.json file, report keys that
// exist in one locale (en/es) but not in its counterpart.
import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const PAIRS = [
  [/^en\.json$/, "es.json"],
  [/^es\.json$/, "en.json"],
  [/^(.*)\.en\.json$/, "$1.es.json"],
  [/^(.*)\.es\.json$/, "$1.en.json"],
];

function flatten(obj, prefix = "", out = new Set()) {
  for (const [key, value] of Object.entries(obj ?? {})) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) flatten(value, path, out);
    else out.add(path);
  }
  return out;
}

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let filePath = "";
  try {
    filePath = JSON.parse(raw)?.tool_input?.file_path ?? "";
  } catch {
    process.exit(0);
  }
  const normalized = filePath.replace(/\\/g, "/");
  if (!/\/messages\/[^/]+\.json$/.test(normalized)) process.exit(0);

  const name = basename(normalized);
  const pair = PAIRS.find(([re]) => re.test(name));
  if (!pair) process.exit(0);
  const counterpart = join(dirname(normalized), name.replace(pair[0], pair[1]));
  if (!existsSync(counterpart)) {
    console.error(`i18n: ${name} has no counterpart (${basename(counterpart)}).`);
    process.exit(2);
  }

  let a, b;
  try {
    a = flatten(JSON.parse(readFileSync(normalized, "utf8")));
    b = flatten(JSON.parse(readFileSync(counterpart, "utf8")));
  } catch (err) {
    console.error(`i18n: invalid JSON (${err.message}).`);
    process.exit(2);
  }

  const onlyHere = [...a].filter((k) => !b.has(k));
  const onlyThere = [...b].filter((k) => !a.has(k));
  if (onlyHere.length === 0 && onlyThere.length === 0) process.exit(0);

  const lines = [`i18n parity mismatch between ${name} and ${basename(counterpart)}:`];
  if (onlyHere.length) lines.push(`  missing in ${basename(counterpart)}: ${onlyHere.join(", ")}`);
  if (onlyThere.length) lines.push(`  missing in ${name}: ${onlyThere.join(", ")}`);
  console.error(lines.join("\n"));
  process.exit(2);
});
