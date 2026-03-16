import ora from "ora";
import { generateChatPrompt } from "../core/engine.js";
import { printPrompt, printError } from "../utils/display.js";

export async function chatCommand(message: string): Promise<void> {
  if (!message || message.trim().length === 0) {
    printError("Please provide a design description. Example:");
    console.log('  designnn chat "SaaS pricing page with dark theme"');
    process.exit(1);
  }

  const spinner = ora({
    text: "Analyzing your request and generating Figma AI prompt...",
    color: "yellow",
  }).start();

  try {
    const prompt = await generateChatPrompt(message);
    spinner.stop();
    printPrompt(prompt, `Prompt for: "${message}"`);
  } catch (error: any) {
    spinner.stop();
    if (error?.code === "ENOTFOUND" || error?.message?.includes("API key")) {
      printError(
        "OpenAI API key not found. Set it with:\n  export OPENAI_API_KEY=your-key\n  or: designnn config --api-key your-key"
      );
    } else {
      printError(`Generation failed: ${error?.message || "Unknown error"}`);
    }
    process.exit(1);
  }
}
