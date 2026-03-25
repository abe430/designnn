import ora from "ora";
import { generateChatPrompt } from "../core/engine.js";
import { printPrompt, printError } from "../utils/display.js";
import { t } from "../utils/i18n.js";

export async function chatCommand(message: string): Promise<void> {
  if (!message || message.trim().length === 0) {
    printError(t("chatNoMessage"));
    process.exit(1);
  }

  const spinner = ora({
    text: t("chatAnalyzing"),
    color: "yellow",
  }).start();

  try {
    const prompt = await generateChatPrompt(message);
    spinner.stop();
    printPrompt(prompt, `${t("chatPromptFor")} "${message}"`);
  } catch (error: any) {
    spinner.stop();
    if (error?.code === "ENOTFOUND" || error?.message?.includes("API key")) {
      printError(t("chatApiKeyError"));
    } else {
      printError(`${t("chatFailed")}: ${error?.message || "Unknown error"}`);
    }
    process.exit(1);
  }
}
