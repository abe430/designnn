#!/usr/bin/env node

import { Command } from "commander";
import { printBanner } from "./utils/display.js";
import { chatCommand } from "./commands/chat.js";
import { exploreCommand } from "./commands/explore.js";
import { mixCommand } from "./commands/mix.js";

const program = new Command();

program
  .name("designnn")
  .description(
    "Trend-driven design prompt engine for Figma AI.\nGenerate high-quality UI/UX prompts powered by real-time design trend analysis."
  )
  .version("0.1.0")
  .hook("preAction", () => {
    printBanner();
  });

// === chat command ===
program
  .command("chat <message>")
  .description("Generate a Figma AI prompt from a natural language description")
  .action(async (message: string) => {
    await chatCommand(message);
  });

// === explore command ===
program
  .command("explore")
  .description("Browse and search design trends")
  .option("-c, --category <category>", "Filter by category: style, component, pattern, layout, interaction")
  .option("-s, --component <query>", "Search trends by keyword")
  .option("-t, --top <number>", "Show top N trends by popularity")
  .option("-g, --generate <trend-id>", "Generate a Figma AI prompt from a specific trend")
  .action(async (options) => {
    await exploreCommand(options);
  });

// === mix command ===
program
  .command("mix <trend1> <trend2>")
  .description("Mix two design trends into a single creative Figma AI prompt")
  .option("--context <description>", "Additional context for the mix (e.g., 'for a fintech dashboard')")
  .action(async (trend1: string, trend2: string, options) => {
    await mixCommand(trend1, trend2, options);
  });

// === serve command ===
program
  .command("serve")
  .description("Start DESIGNNN Web UI in your browser")
  .option("-p, --port <number>", "Port number", "3333")
  .action(async (options) => {
    const port = parseInt(options.port, 10);
    const { startWebServer } = await import("./web/server.js");
    startWebServer(port);
  });

// === agent command ===
program
  .command("agent")
  .description("Start DESIGNNN as an MCP server for AI agent integration")
  .action(async () => {
    // Don't print banner for MCP server (stdout is used for protocol)
    const { startMcpServer } = await import("./mcp/server.js");
    await startMcpServer();
  });

// === Parse and run ===
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  printBanner();
  program.outputHelp();
}
