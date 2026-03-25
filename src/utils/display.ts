import chalk from "chalk";
import type { Trend } from "../data/trends.js";
import { t } from "./i18n.js";

export const BRAND = {
  name: chalk.bold.hex("#CCFF00")("DESIGNNN"),
  tagline: () => chalk.gray(t("tagline")),
  version: chalk.gray("v0.4.0"),
};

export function printBanner(): void {
  console.log("");
  console.log(`  ${BRAND.name} ${BRAND.version}`);
  console.log(`  ${BRAND.tagline()}`);
  console.log("");
}

export function printTrend(trend: Trend, index?: number): void {
  const prefix = index !== undefined ? chalk.gray(`${index + 1}.`) : "•";
  const pop = getPopularityBar(trend.popularity);
  console.log(
    `  ${prefix} ${chalk.bold(trend.name)} ${chalk.gray(`[${trend.category}]`)} ${pop}`
  );
  console.log(`     ${chalk.dim(trend.description)}`);
  console.log(
    `     ${chalk.gray(t("keywords") + ":")} ${trend.keywords.map((k) => chalk.cyan(k)).join(", ")}`
  );
  console.log("");
}

export function printPrompt(prompt: string, label?: string): void {
  console.log("");
  console.log(
    chalk.hex("#CCFF00").bold(`  ─── ${label || t("generatedPrompt")} ───`)
  );
  console.log("");
  console.log(chalk.white(`  ${prompt.split("\n").join("\n  ")}`));
  console.log("");
  console.log(chalk.hex("#CCFF00")("  ─────────────────────────────────"));
  console.log("");
  console.log(
    chalk.dim(`  📋 ${t("copyHint")}`)
  );
  console.log("");
}

export function printError(message: string): void {
  console.error(chalk.red(`  ✖ ${message}`));
}

export function printSuccess(message: string): void {
  console.log(chalk.green(`  ✔ ${message}`));
}

function getPopularityBar(popularity: number): string {
  const filled = Math.round(popularity / 10);
  const empty = 10 - filled;
  return (
    chalk.hex("#CCFF00")("█".repeat(filled)) +
    chalk.gray("░".repeat(empty)) +
    chalk.gray(` ${popularity}%`)
  );
}

export function printSection(title: string): void {
  console.log("");
  console.log(chalk.bold.hex("#CCFF00")(`  ▸ ${title}`));
  console.log(chalk.gray("  " + "─".repeat(40)));
}
