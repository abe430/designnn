import ora from "ora";
import chalk from "chalk";
import OpenAI from "openai";
import { getConfig } from "../utils/config.js";
import {
  type Trend,
  getAllTrends,
  addCustomTrend,
  getTrendStats,
  loadCustomTrends,
  saveCustomTrends,
} from "../data/trends.js";
import { printSection, printError } from "../utils/display.js";

const RESEARCH_SYSTEM_PROMPT = `You are a design trend researcher. Your job is to identify current and emerging UI/UX design trends.

For each trend you identify, provide:
1. A unique kebab-case ID
2. A clear name
3. A category: one of "style", "component", "pattern", "layout", "interaction"
4. A detailed description (2-3 sentences)
5. 5 relevant keywords
6. A popularity score (1-100) based on current adoption
7. 4-5 specific Figma AI prompt hints with exact values (px, colors, etc.)

IMPORTANT:
- Focus on trends that are CURRENTLY popular or EMERGING in ${new Date().getFullYear()}
- Be specific and actionable in your Figma prompt hints
- Include exact CSS/design values where possible
- Do NOT include trends that are outdated or declining

Respond in valid JSON format as an array of trend objects.`;

interface UpdateOptions {
  count?: string;
  category?: string;
  reset?: boolean;
}

export async function updateCommand(options: UpdateOptions): Promise<void> {
  // Handle reset
  if (options.reset) {
    saveCustomTrends([]);
    console.log(chalk.hex("#CCFF00")("  ✓ Custom trends cleared.\n"));
    return;
  }

  const count = parseInt(options.count || "5", 10);
  const category = options.category;
  const config = getConfig();

  printSection("Trend Research");

  const stats = getTrendStats();
  console.log(chalk.dim(`  Current DB: ${stats.total} trends (${stats.builtin} built-in, ${stats.custom} custom)\n`));

  // Get existing trend names to avoid duplicates
  const existingNames = getAllTrends().map((t) => t.name.toLowerCase());

  const spinner = ora({
    text: `Researching ${count} new design trends${category ? ` in "${category}"` : ""}...`,
    color: "yellow",
  }).start();

  try {
    const client = new OpenAI({
      apiKey: config.openaiApiKey,
      ...(config.openaiBaseUrl ? { baseURL: config.openaiBaseUrl } : {}),
    });

    const userPrompt = `Research and identify ${count} NEW UI/UX design trends${category ? ` specifically in the "${category}" category` : ""} that are trending in ${new Date().getFullYear()}.

AVOID these trends that are already in our database:
${existingNames.join(", ")}

Focus on:
- Emerging trends from Dribbble, Behance, and Awwwards
- New design patterns from major product launches (Apple, Google, Figma, Linear, Vercel)
- Innovative UI patterns from the AI/ML product space
- Mobile-first design innovations
- Accessibility-driven design trends

Return a JSON array of ${count} trend objects with this exact schema:
{
  "id": "kebab-case-id",
  "name": "Trend Name",
  "category": "style|component|pattern|layout|interaction",
  "description": "2-3 sentence description",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "popularity": 75,
  "year": ${new Date().getFullYear()},
  "figmaPromptHints": [
    "Specific hint with exact values",
    "Another hint with px/color values",
    "Third actionable hint",
    "Fourth design specification"
  ]
}

Return ONLY the JSON array, no other text.`;

    const response = await client.chat.completions.create({
      model: config.model,
      messages: [
        { role: "system", content: RESEARCH_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 4000,
    });

    const content = response.choices[0]?.message?.content?.trim() || "";

    // Parse JSON from response (handle markdown code blocks)
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const newTrends: Trend[] = JSON.parse(jsonStr);
    spinner.stop();

    // Validate and add each trend
    let added = 0;
    let skipped = 0;

    console.log("");
    for (const trend of newTrends) {
      // Validate required fields
      if (!trend.id || !trend.name || !trend.category || !trend.description) {
        console.log(chalk.yellow(`  ⚠ Skipped invalid trend (missing fields)`));
        skipped++;
        continue;
      }

      // Check for duplicates
      if (existingNames.includes(trend.name.toLowerCase())) {
        console.log(chalk.dim(`  ⊘ Skipped "${trend.name}" (already exists)`));
        skipped++;
        continue;
      }

      // Ensure proper structure
      const validTrend: Trend = {
        id: trend.id,
        name: trend.name,
        category: trend.category,
        description: trend.description,
        keywords: trend.keywords || [],
        popularity: Math.min(100, Math.max(1, trend.popularity || 50)),
        year: trend.year || new Date().getFullYear(),
        figmaPromptHints: trend.figmaPromptHints || [],
        source: "ai-generated",
        addedAt: new Date().toISOString(),
      };

      addCustomTrend(validTrend);
      added++;

      console.log(
        chalk.hex("#CCFF00")(`  ✓ `) +
        chalk.bold(validTrend.name) +
        chalk.dim(` [${validTrend.category}] `) +
        chalk.dim(`popularity: ${validTrend.popularity}%`)
      );
    }

    console.log("");
    const updatedStats = getTrendStats();
    console.log(
      chalk.hex("#CCFF00").bold(`  ✓ Added ${added} new trends`) +
      (skipped > 0 ? chalk.dim(` (${skipped} skipped)`) : "")
    );
    console.log(
      chalk.dim(`  Total DB: ${updatedStats.total} trends (${updatedStats.builtin} built-in, ${updatedStats.custom} custom)\n`)
    );

  } catch (error: any) {
    spinner.stop();

    if (error instanceof SyntaxError) {
      printError("Failed to parse AI response. Try running the command again.");
    } else {
      printError(`Research failed: ${error?.message || "Unknown error"}`);
    }
  }
}
