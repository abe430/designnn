import chalk from "chalk";
import { getTrendStats, loadCustomTrends, BUILTIN_TRENDS } from "../data/trends.js";
import { printSection } from "../utils/display.js";

export async function statsCommand(): Promise<void> {
  const stats = getTrendStats();
  const customs = loadCustomTrends();

  printSection("Trend Database Statistics");

  // Overview
  console.log(chalk.bold("  Overview"));
  console.log(chalk.dim("  ─────────────────────────────────"));
  console.log(`  Total Trends:    ${chalk.hex("#CCFF00").bold(String(stats.total))}`);
  console.log(`  Built-in:        ${chalk.white(String(stats.builtin))}`);
  console.log(`  AI-Generated:    ${chalk.cyan(String(customs.filter((t) => t.source === "ai-generated").length))}`);
  console.log(`  User-Added:      ${chalk.magenta(String(customs.filter((t) => t.source === "user").length))}`);
  console.log("");

  // Categories
  console.log(chalk.bold("  By Category"));
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
    console.log(
      `  ${categoryEmojis[cat] || "○"} ${chalk.bold(cat.padEnd(14))} ${bar} ${chalk.hex("#CCFF00")(String(count))}`
    );
  }
  console.log("");

  // Top 5 by popularity
  const allTrends = [...BUILTIN_TRENDS, ...customs].sort((a, b) => b.popularity - a.popularity);
  console.log(chalk.bold("  Top 5 Trends"));
  console.log(chalk.dim("  ─────────────────────────────────"));
  for (const t of allTrends.slice(0, 5)) {
    const popBar = chalk.hex("#CCFF00")("█".repeat(Math.round(t.popularity / 5)));
    console.log(
      `  ${popBar} ${chalk.bold(t.name)} ${chalk.dim(`${t.popularity}%`)}`
    );
  }
  console.log("");

  // Recently added custom trends
  if (customs.length > 0) {
    const recent = customs
      .filter((t) => t.addedAt)
      .sort((a, b) => new Date(b.addedAt!).getTime() - new Date(a.addedAt!).getTime())
      .slice(0, 5);

    if (recent.length > 0) {
      console.log(chalk.bold("  Recently Added"));
      console.log(chalk.dim("  ─────────────────────────────────"));
      for (const t of recent) {
        const date = new Date(t.addedAt!).toLocaleDateString();
        const source = t.source === "ai-generated" ? chalk.cyan("AI") : chalk.magenta("User");
        console.log(
          `  ${source} ${chalk.bold(t.name)} ${chalk.dim(`[${t.category}] ${date}`)}`
        );
      }
      console.log("");
    }
  }

  console.log(chalk.dim("  Tip: Run 'designnn update' to research and add new trends"));
  console.log(chalk.dim("  Tip: Run 'designnn update --reset' to clear custom trends\n"));
}
