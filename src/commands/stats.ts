import chalk from "chalk";
import { getTrendStats, loadCustomTrends, BUILTIN_TRENDS } from "../data/trends.js";
import { printSection } from "../utils/display.js";
import { t, getCategoryName } from "../utils/i18n.js";

export async function statsCommand(): Promise<void> {
  const stats = getTrendStats();
  const customs = loadCustomTrends();

  printSection(t("statsTitle"));

  // Overview
  console.log(chalk.bold(`  ${t("statsOverview")}`));
  console.log(chalk.dim("  ─────────────────────────────────"));
  console.log(`  ${t("statsTotalTrends")}:    ${chalk.hex("#CCFF00").bold(String(stats.total))}`);
  console.log(`  ${t("statsBuiltin")}:        ${chalk.white(String(stats.builtin))}`);
  console.log(`  ${t("statsAiGenerated")}:    ${chalk.cyan(String(customs.filter((t) => t.source === "ai-generated").length))}`);
  console.log(`  ${t("statsUserAdded")}:      ${chalk.magenta(String(customs.filter((t) => t.source === "user").length))}`);
  console.log("");

  // Categories
  console.log(chalk.bold(`  ${t("statsByCategory")}`));
  console.log(chalk.dim("  ─────────────────────────────────"));

  const categoryEmojis: Record<string, string> = {
    style: "◆",
    component: "◇",
    pattern: "▣",
    layout: "▤",
    interaction: "▥",
  };

  for (const [cat, count] of Object.entries(stats.categories).sort((a, b) => b[1] - a[1])) {
    const bar = "█".repeat(Math.round(count / 2)) + chalk.dim("░".repeat(Math.max(0, 15 - Math.round(count / 2))));
    const label = getCategoryName(cat);
    console.log(
      `  ${categoryEmojis[cat] || "○"} ${chalk.bold(label.padEnd(14))} ${bar} ${chalk.hex("#CCFF00")(String(count))}`
    );
  }
  console.log("");

  // Top 5 by popularity
  const allTrends = [...BUILTIN_TRENDS, ...customs].sort((a, b) => b.popularity - a.popularity);
  console.log(chalk.bold(`  ${t("statsTop5")}`));
  console.log(chalk.dim("  ─────────────────────────────────"));
  for (const trend of allTrends.slice(0, 5)) {
    const popBar = chalk.hex("#CCFF00")("█".repeat(Math.round(trend.popularity / 5)));
    console.log(
      `  ${popBar} ${chalk.bold(trend.name)} ${chalk.dim(`${trend.popularity}%`)}`
    );
  }
  console.log("");

  // Recently added custom trends
  if (customs.length > 0) {
    const recent = customs
      .filter((trend) => trend.addedAt)
      .sort((a, b) => new Date(b.addedAt!).getTime() - new Date(a.addedAt!).getTime())
      .slice(0, 5);

    if (recent.length > 0) {
      console.log(chalk.bold(`  ${t("statsRecentlyAdded")}`));
      console.log(chalk.dim("  ─────────────────────────────────"));
      for (const trend of recent) {
        const date = new Date(trend.addedAt!).toLocaleDateString();
        const source = trend.source === "ai-generated" ? chalk.cyan("AI") : chalk.magenta("User");
        console.log(
          `  ${source} ${chalk.bold(trend.name)} ${chalk.dim(`[${trend.category}] ${date}`)}`
        );
      }
      console.log("");
    }
  }

  console.log(chalk.dim(`  ${t("statsTipUpdate")}`));
  console.log(chalk.dim(`  ${t("statsTipReset")}\n`));
}
