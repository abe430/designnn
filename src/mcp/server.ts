import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  searchTrends,
  getTopTrends,
  getTrendsByCategory,
  getTrendById,
  TRENDS,
  type Trend,
} from "../data/trends.js";
import {
  generateChatPrompt,
  generateTrendPrompt,
  generateMixPrompt,
} from "../core/engine.js";

export async function startMcpServer(): Promise<void> {
  const server = new McpServer({
    name: "designnn",
    version: "0.1.0",
  });

  // === Tool: generate_prompt ===
  server.tool(
    "generate_prompt",
    "Generate a Figma AI design prompt from a natural language description. Returns a ready-to-use prompt optimized for Figma AI's Make Designs feature.",
    {
      message: z.string().describe("Natural language description of the desired UI design. Example: 'SaaS pricing page with dark theme'"),
    },
    async ({ message }) => {
      try {
        const prompt = await generateChatPrompt(message);
        return {
          content: [{ type: "text" as const, text: prompt }],
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error generating prompt: ${error?.message || "Unknown error"}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // === Tool: explore_trends ===
  server.tool(
    "explore_trends",
    "Search and browse current UI/UX design trends. Returns trend data including name, description, popularity, and Figma-specific hints.",
    {
      query: z.string().optional().describe("Search keyword to filter trends"),
      category: z
        .enum(["style", "component", "pattern", "layout", "interaction"])
        .optional()
        .describe("Filter trends by category"),
      top: z.number().optional().describe("Return top N trends by popularity"),
    },
    async ({ query, category, top }) => {
      let results: Trend[];

      if (query) {
        results = searchTrends(query);
      } else if (category) {
        results = getTrendsByCategory(category);
      } else if (top) {
        results = getTopTrends(top);
      } else {
        results = getTopTrends(10);
      }

      const formatted = results.map((t) => ({
        id: t.id,
        name: t.name,
        category: t.category,
        description: t.description,
        popularity: t.popularity,
        keywords: t.keywords,
        figmaPromptHints: t.figmaPromptHints,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(formatted, null, 2),
          },
        ],
      };
    }
  );

  // === Tool: generate_trend_prompt ===
  server.tool(
    "generate_trend_prompt",
    "Generate a Figma AI prompt based on a specific design trend. Provide a trend ID to get a detailed prompt showcasing that trend.",
    {
      trendId: z.string().describe("The ID of the trend to generate a prompt for. Use explore_trends to find available IDs."),
    },
    async ({ trendId }) => {
      const trend = getTrendById(trendId);
      if (!trend) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Trend "${trendId}" not found. Available trends: ${TRENDS.map((t) => t.id).join(", ")}`,
            },
          ],
          isError: true,
        };
      }

      try {
        const prompt = await generateTrendPrompt(trend);
        return {
          content: [{ type: "text" as const, text: prompt }],
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error generating prompt: ${error?.message || "Unknown error"}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // === Tool: mix_trends ===
  server.tool(
    "mix_trends",
    "Mix two design trends into a single creative Figma AI prompt. Combines elements from both trends to create something innovative.",
    {
      trend1: z.string().describe("ID or name of the first trend"),
      trend2: z.string().describe("ID or name of the second trend"),
      context: z.string().optional().describe("Additional context for the mix, e.g., 'for a fintech dashboard'"),
    },
    async ({ trend1, trend2, context }) => {
      const t1 = getTrendById(trend1) || searchTrends(trend1)[0];
      const t2 = getTrendById(trend2) || searchTrends(trend2)[0];

      if (!t1) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Trend "${trend1}" not found. Available trends: ${TRENDS.map((t) => t.id).join(", ")}`,
            },
          ],
          isError: true,
        };
      }

      if (!t2) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Trend "${trend2}" not found. Available trends: ${TRENDS.map((t) => t.id).join(", ")}`,
            },
          ],
          isError: true,
        };
      }

      try {
        const prompt = await generateMixPrompt(t1, t2, context);
        return {
          content: [{ type: "text" as const, text: prompt }],
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error generating prompt: ${error?.message || "Unknown error"}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // === Resource: trend list ===
  server.resource(
    "trends://all",
    "trends://all",
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(
            TRENDS.map((t) => ({
              id: t.id,
              name: t.name,
              category: t.category,
              popularity: t.popularity,
            })),
            null,
            2
          ),
        },
      ],
    })
  );

  // Start the server
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
