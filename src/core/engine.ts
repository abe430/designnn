import OpenAI from "openai";
import { getConfig } from "../utils/config.js";
import type { Trend } from "../data/trends.js";

const SYSTEM_PROMPT = `You are DESIGNNN, an expert UI/UX design prompt engineer specialized in Figma AI.
Your role is to generate highly detailed, actionable design prompts that Figma AI can use to create stunning UI designs.

RULES:
1. Every prompt MUST be optimized for Figma AI's "Make designs" feature (Ctrl+I / Cmd+I).
2. Include specific details: layout structure, spacing, colors, typography, component hierarchy.
3. Reference current design trends when relevant.
4. Output prompts in clear, structured English (Figma AI works best in English).
5. Include Figma-specific terminology: frames, auto-layout, components, variants, constraints.
6. Specify exact values where possible: px sizes, color hex codes, border radius, spacing.

OUTPUT FORMAT:
Return ONLY the prompt text that can be directly pasted into Figma AI. No explanations, no markdown, no code blocks.
Start the prompt with the design goal, then list specific requirements.`;

function getClient(): OpenAI {
  const config = getConfig();
  return new OpenAI({
    apiKey: config.openaiApiKey,
    ...(config.openaiBaseUrl ? { baseURL: config.openaiBaseUrl } : {}),
  });
}

export async function generateChatPrompt(userMessage: string): Promise<string> {
  const config = getConfig();
  const client = getClient();

  const response = await client.chat.completions.create({
    model: config.model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Generate a Figma AI design prompt for the following request:\n\n"${userMessage}"\n\nCreate a detailed, actionable prompt that Figma AI can use to generate this design.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 1500,
  });

  return response.choices[0]?.message?.content?.trim() || "Failed to generate prompt.";
}

export async function generateTrendPrompt(trend: Trend): Promise<string> {
  const config = getConfig();
  const client = getClient();

  const trendContext = `
Trend: ${trend.name}
Category: ${trend.category}
Description: ${trend.description}
Popularity: ${trend.popularity}%
Key Figma hints:
${trend.figmaPromptHints.map((h) => `- ${h}`).join("\n")}
`;

  const response = await client.chat.completions.create({
    model: config.model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Generate a Figma AI design prompt that showcases the following design trend:\n\n${trendContext}\n\nCreate a complete, ready-to-use prompt that demonstrates this trend in a practical UI design. The prompt should result in a visually impressive design that clearly embodies this trend.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 1500,
  });

  return response.choices[0]?.message?.content?.trim() || "Failed to generate prompt.";
}

export async function generateMixPrompt(
  trend1: Trend,
  trend2: Trend,
  context?: string
): Promise<string> {
  const config = getConfig();
  const client = getClient();

  const mixContext = `
TREND 1: ${trend1.name}
- ${trend1.description}
- Figma hints: ${trend1.figmaPromptHints.join("; ")}

TREND 2: ${trend2.name}
- ${trend2.description}
- Figma hints: ${trend2.figmaPromptHints.join("; ")}

${context ? `ADDITIONAL CONTEXT: ${context}` : ""}
`;

  const response = await client.chat.completions.create({
    model: config.model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Generate a Figma AI design prompt that MIXES the following two design trends into a single cohesive design:\n\n${mixContext}\n\nThe prompt should creatively combine elements from both trends. Find the synergy between them and create something that feels fresh and innovative, not just a simple overlay of two styles. The result should be a practical, usable UI design.`,
      },
    ],
    temperature: 0.8,
    max_tokens: 2000,
  });

  return response.choices[0]?.message?.content?.trim() || "Failed to generate prompt.";
}
