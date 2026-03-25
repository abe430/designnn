import ora from "ora";
import chalk from "chalk";
import { searchTrends, TRENDS, type Trend } from "../data/trends.js";
import { generateMixPrompt } from "../core/engine.js";
import { printTrend, printPrompt, printSection, printError } from "../utils/display.js";
import { t } from "../utils/i18n.js";

export async function mixCommand(
  trend1Name: string,
  trend2Name: string,
  options: { context?: string }
): Promise<void> {
  if (!trend1Name || !trend2Name) {
    printError(t("mixNoTrends"));
    process.exit(1);
  }

  // Find trends by ID or name search
  const trend1 = findTrend(trend1Name);
  const trend2 = findTrend(trend2Name);

  if (!trend1) {
    printError(`${t("mixTrendNotFound")}: "${trend1Name}"`);
    suggestTrends(trend1Name);
    process.exit(1);
  }

  if (!trend2) {
    printError(`${t("mixTrendNotFound")}: "${trend2Name}"`);
    suggestTrends(trend2Name);
    process.exit(1);
  }

  printSection(t("mixMixing"));
  console.log("");
  console.log(chalk.bold(`  ${t("mixTrendA")}`));
  printTrend(trend1);
  console.log(chalk.bold(`  ${t("mixTrendB")}`));
  printTrend(trend2);

  if (options.context) {
    console.log(chalk.dim(`  ${t("mixContext")}: "${options.context}"\n`));
  }

  const spinner = ora({
    text: `"${trend1.name}" × "${trend2.name}" ${t("mixGenerating")}`,
    color: "yellow",
  }).start();

  try {
    const prompt = await generateMixPrompt(trend1, trend2, options.context);
    spinner.stop();
    printPrompt(prompt, `${t("mixResult")}: ${trend1.name} × ${trend2.name}`);
  } catch (error: any) {
    spinner.stop();
    printError(`${t("chatFailed")}: ${error?.message || "Unknown error"}`);
    process.exit(1);
  }
}

function findTrend(query: string): Trend | undefined {
  // Try exact ID match first
  const byId = TRENDS.find((t) => t.id === query.toLowerCase());
  if (byId) return byId;

  // Try exact name match (case-insensitive)
  const byName = TRENDS.find(
    (t) => t.name.toLowerCase() === query.toLowerCase()
  );
  if (byName) return byName;

  // Try search
  const results = searchTrends(query);
  return results[0];
}

function suggestTrends(query: string): void {
  const results = searchTrends(query);
  if (results.length > 0) {
    console.log(chalk.dim(`  ${t("mixDidYouMean")}`));
    results.slice(0, 3).forEach((trend) => {
      console.log(chalk.dim(`    - ${trend.name} (${trend.id})`));
    });
  } else {
    console.log(chalk.dim(`  ${t("mixAvailableTrends")}`));
    TRENDS.slice(0, 5).forEach((trend) => {
      console.log(chalk.dim(`    - ${trend.name} (${trend.id})`));
    });
    console.log(chalk.dim(`  ${t("mixSeeAll")}`));
  }
}
