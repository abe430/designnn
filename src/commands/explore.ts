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

interface ExploreOptions {
  category?: string;
  component?: string;
  top?: string;
  generate?: string;
}

export async function exploreCommand(options: ExploreOptions): Promise<void> {
  let results: Trend[] = [];
  let title = "Design Trends";

  if (options.component) {
    results = searchTrends(options.component);
    title = `Trends matching: "${options.component}"`;
  } else if (options.category) {
    const validCategories = ["style", "component", "pattern", "layout", "interaction"];
    if (!validCategories.includes(options.category)) {
      printError(
        `Invalid category. Choose from: ${validCategories.join(", ")}`
      );
      process.exit(1);
    }
    results = getTrendsByCategory(options.category as Trend["category"]);
    title = `${options.category.charAt(0).toUpperCase() + options.category.slice(1)} Trends`;
  } else if (options.top) {
    const limit = parseInt(options.top) || 10;
    results = getTopTrends(limit);
    title = `Top ${limit} Design Trends`;
  } else {
    // Default: show all trends grouped by category
    printSection("All Design Trends");
    console.log(chalk.dim(`  ${TRENDS.length} trends in database\n`));

    const categories = ["style", "component", "pattern", "layout", "interaction"] as const;
    for (const cat of categories) {
      const catTrends = getTrendsByCategory(cat);
      console.log(
        chalk.bold(`  ${cat.toUpperCase()} (${catTrends.length})`)
      );
      catTrends.forEach((t, i) => printTrend(t, i));
    }

    console.log(chalk.dim("  Tip: Use --category, --component, or --top to filter"));
    console.log(
      chalk.dim('  Tip: Use --generate <trend-id> to create a prompt from a trend\n')
    );
    return;
  }

  if (results.length === 0) {
    printError("No trends found matching your query.");
    console.log(chalk.dim("  Try: designnn explore --top 10"));
    return;
  }

  printSection(title);
  console.log(chalk.dim(`  ${results.length} results\n`));
  results.forEach((t, i) => printTrend(t, i));

  // If --generate flag is set, generate a prompt from the specified trend
  if (options.generate) {
    const trend =
      results.find((t) => t.id === options.generate) ||
      TRENDS.find((t) => t.id === options.generate);

    if (!trend) {
      printError(`Trend "${options.generate}" not found.`);
      console.log(
        chalk.dim("  Available IDs: " + results.map((t) => t.id).join(", "))
      );
      return;
    }

    const spinner = ora({
      text: `Generating Figma AI prompt for "${trend.name}"...`,
      color: "yellow",
    }).start();

    try {
      const prompt = await generateTrendPrompt(trend);
      spinner.stop();
      printPrompt(prompt, `Trend: ${trend.name}`);
    } catch (error: any) {
      spinner.stop();
      printError(`Generation failed: ${error?.message || "Unknown error"}`);
    }
  }
}
