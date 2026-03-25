import ora from "ora";
import chalk from "chalk";
import {
  searchTrends,
  getTrendsByCategory,
  getTopTrends,
  TRENDS,
  type Trend,
} from "../data/trends.js";
import { generateTrendPrompt } from "../core/engine.js";
import { printTrend, printPrompt, printSection, printError } from "../utils/display.js";
import { t, getCategoryName } from "../utils/i18n.js";

interface ExploreOptions {
  category?: string;
  component?: string;
  top?: string;
  generate?: string;
}

export async function exploreCommand(options: ExploreOptions): Promise<void> {
  let results: Trend[] = [];
  let title = t("exploreDesignTrends");

  if (options.component) {
    results = searchTrends(options.component);
    title = `${t("exploreMatching")}: "${options.component}"`;
  } else if (options.category) {
    const validCategories = ["style", "component", "pattern", "layout", "interaction"];
    if (!validCategories.includes(options.category)) {
      printError(
        `${t("exploreInvalidCategory")}: ${validCategories.join(", ")}`
      );
      process.exit(1);
    }
    results = getTrendsByCategory(options.category as Trend["category"]);
    title = `${getCategoryName(options.category)} ${t("exploreTrends")}`;
  } else if (options.top) {
    const limit = parseInt(options.top) || 10;
    results = getTopTrends(limit);
    title = `${t("exploreTop")} ${limit} ${t("exploreDesignTrends")}`;
  } else {
    // Default: show all trends grouped by category
    printSection(t("exploreAllTrends"));
    console.log(chalk.dim(`  ${TRENDS.length} ${t("exploreTrendsInDb")}\n`));

    const categories = ["style", "component", "pattern", "layout", "interaction"] as const;
    for (const cat of categories) {
      const catTrends = getTrendsByCategory(cat);
      console.log(
        chalk.bold(`  ${getCategoryName(cat).toUpperCase()} (${catTrends.length})`)
      );
      catTrends.forEach((t, i) => printTrend(t, i));
    }

    console.log(chalk.dim(`  ${t("exploreTipFilter")}`));
    console.log(chalk.dim(`  ${t("exploreTipGenerate")}\n`));
    return;
  }

  if (results.length === 0) {
    printError(t("exploreNoResults"));
    console.log(chalk.dim("  Try: designnn explore --top 10"));
    return;
  }

  printSection(title);
  console.log(chalk.dim(`  ${results.length} ${t("exploreResults")}\n`));
  results.forEach((t, i) => printTrend(t, i));

  // If --generate flag is set, generate a prompt from the specified trend
  if (options.generate) {
    const trend =
      results.find((t) => t.id === options.generate) ||
      TRENDS.find((t) => t.id === options.generate);

    if (!trend) {
      printError(`${t("exploreTrendNotFound")}: "${options.generate}"`);
      console.log(
        chalk.dim(`  ${t("exploreAvailableIds")}: ` + results.map((t) => t.id).join(", "))
      );
      return;
    }

    const spinner = ora({
      text: `${t("exploreGenerating")} "${trend.name}"...`,
      color: "yellow",
    }).start();

    try {
      const prompt = await generateTrendPrompt(trend);
      spinner.stop();
      printPrompt(prompt, `Trend: ${trend.name}`);
    } catch (error: any) {
      spinner.stop();
      printError(`${t("chatFailed")}: ${error?.message || "Unknown error"}`);
    }
  }
}
