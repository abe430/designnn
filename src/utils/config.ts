import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";

export interface DesignnnConfig {
  openaiApiKey?: string;
  openaiBaseUrl?: string;
  model: string;
  language: string;
  outputFormat: "figma" | "markdown" | "json";
}

const CONFIG_DIR = join(homedir(), ".designnn");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

const DEFAULT_CONFIG: DesignnnConfig = {
  model: "gpt-4.1-mini",
  language: "en",
  outputFormat: "figma",
};

export function getConfig(): DesignnnConfig {
  if (!existsSync(CONFIG_FILE)) {
    return {
      ...DEFAULT_CONFIG,
      openaiApiKey: process.env.OPENAI_API_KEY,
      openaiBaseUrl: process.env.OPENAI_BASE_URL,
    };
  }
  try {
    const raw = readFileSync(CONFIG_FILE, "utf-8");
    const saved = JSON.parse(raw);
    return {
      ...DEFAULT_CONFIG,
      ...saved,
      openaiApiKey: saved.openaiApiKey || process.env.OPENAI_API_KEY,
      openaiBaseUrl: saved.openaiBaseUrl || process.env.OPENAI_BASE_URL,
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(config: Partial<DesignnnConfig>): void {
  if (!existsSync(CONFIG_DIR)) {
    mkdirSync(CONFIG_DIR, { recursive: true });
  }
  const current = getConfig();
  const merged = { ...current, ...config };
  writeFileSync(CONFIG_FILE, JSON.stringify(merged, null, 2));
}
