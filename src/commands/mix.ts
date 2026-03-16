import ora from "ora";
import chalk from "chalk";
import { searchTrends, TRENDS, type Trend } from "../data/trends.js";
import { generateMixPrompt } from "../core/engine.js";
import { printTrend, printPrompt, printSection, printError } from "../utils/display.js";

export async function mixCommand(
  trend1Name: string,
  trend2Name: string,
  options: { context?: string }
): Promise<void> {
  if (!trend1Name || !trend2Name) {
    printError("Please provide two trend names to mix. Example:");
    console.log('  designnn mix "Bento UI" "Glassmorphism"');
    console.log('  designnn mix bento-ui glassmorphism');
    process.exit(1);
  }

  // Find trends by ID or name search
  const trend1 = findTrend(trend1Name);
  const trend2 = findTrend(trend2Name);

  if (!trend1) {
    printError(`Trend "${trend1Name}" not found.`);
    suggestTrends(trend1Name);
    process.exit(1);
  }

  if (!trend2) {
    printError(`Trend "${trend2Name}" not found.`);
    suggestTrends(trend2Name);
    process.exit(1);
  }

  printSection("Mixing Trends");
  console.log("");
  console.log(chalk.bold("  Trend A:"));
  printTrend(trend1);
  console.log(chalk.bold("  Trend B:"));
  printTrend(trend2);

  if (options.context) {
    console.log(chalk.dim(`  Context: "${options.context}"\n`));
  }

  const spinner = ora({
    text: `Mixing "${trend1.name}" × "${trend2.name}" into a Figma AI prompt...`,
    color: "yellow",
  }).start();

  try {
    const prompt = await generateMixPrompt(trend1, trend2, options.context);
    spinner.stop();
    printPrompt(prompt, `Mix: ${trend1.name} × ${trend2.name}`);
  } catch (error: any) {
    spinner.stop();
    printError(`Generation failed: ${error?.message || "Unknown error"}`);
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
    console.log(chalk.dim("  Did you mean:"));
    results.slice(0, 3).forEach((t) => {
      console.log(chalk.dim(`    - ${t.name} (${t.id})`));
    });
  } else {
    console.log(chalk.dim("  Available trends:"));
    TRENDS.slice(0, 5).forEach((t) => {
      console.log(chalk.dim(`    - ${t.name} (${t.id})`));
    });
    console.log(chalk.dim("  Use 'designnn explore' to see all trends."));
  }
}
