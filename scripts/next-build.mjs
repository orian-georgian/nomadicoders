import { spawnSync } from "node:child_process";
import { join } from "node:path";

const env = {
  ...process.env,
  NEXT_DIST_DIR: process.env.NEXT_DIST_DIR || ".next-build",
};

const nextCli = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

const result = spawnSync(process.execPath, [nextCli, "build", ...process.argv.slice(2)], {
  env,
  stdio: "inherit",
});

process.exit(result.status ?? 1);
