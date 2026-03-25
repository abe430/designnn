// ============================================
// DESIGNNN CLI i18n Module
// ============================================

export type Lang = "en" | "ja";

let currentLang: Lang = "en";

export function setLang(lang: Lang): void {
  currentLang = lang;
}

export function getLang(): Lang {
  return currentLang;
}

export function detectLang(): Lang {
  const envLang = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || "";
  if (envLang.startsWith("ja")) return "ja";
  return "en";
}

const messages: Record<string, Record<Lang, string>> = {
  // Banner
  tagline: {
    en: "Trend-driven design prompt engine for Figma AI",
    ja: "Figma AI のためのトレンド駆動デザインプロンプトエンジン",
  },

  // Chat
  chatNoMessage: {
    en: 'Please provide a design description. Example:\n  designnn chat "SaaS pricing page with dark theme"',
    ja: 'デザインの説明を入力してください。例：\n  designnn chat "ダークテーマのSaaS料金ページ"',
  },
  chatAnalyzing: {
    en: "Analyzing your request and generating Figma AI prompt...",
    ja: "リクエストを分析し、Figma AIプロンプトを生成中...",
  },
  chatPromptFor: {
    en: "Prompt for",
    ja: "プロンプト：",
  },
  chatApiKeyError: {
    en: "OpenAI API key not found. Set it with:\n  export OPENAI_API_KEY=your-key\n  or: designnn config --api-key your-key",
    ja: "OpenAI APIキーが見つかりません。以下で設定してください：\n  export OPENAI_API_KEY=your-key\n  または: designnn config --api-key your-key",
  },
  chatFailed: {
    en: "Generation failed",
    ja: "生成に失敗しました",
  },

  // Explore
  exploreAllTrends: {
    en: "All Design Trends",
    ja: "全デザイントレンド",
  },
  exploreTrendsInDb: {
    en: "trends in database",
    ja: "件のトレンドがデータベースに登録済み",
  },
  exploreMatching: {
    en: "Trends matching",
    ja: "検索結果",
  },
  exploreTrends: {
    en: "Trends",
    ja: "トレンド",
  },
  exploreTop: {
    en: "Top",
    ja: "トップ",
  },
  exploreDesignTrends: {
    en: "Design Trends",
    ja: "デザイントレンド",
  },
  exploreNoResults: {
    en: "No trends found matching your query.",
    ja: "該当するトレンドが見つかりませんでした。",
  },
  exploreResults: {
    en: "results",
    ja: "件",
  },
  exploreInvalidCategory: {
    en: "Invalid category. Choose from",
    ja: "無効なカテゴリです。以下から選択してください",
  },
  exploreTipFilter: {
    en: "Tip: Use --category, --component, or --top to filter",
    ja: "ヒント: --category, --component, --top でフィルタリングできます",
  },
  exploreTipGenerate: {
    en: "Tip: Use --generate <trend-id> to create a prompt from a trend",
    ja: "ヒント: --generate <trend-id> でトレンドからプロンプトを生成できます",
  },
  exploreGenerating: {
    en: "Generating Figma AI prompt for",
    ja: "Figma AIプロンプトを生成中：",
  },
  exploreTrendNotFound: {
    en: "Trend not found",
    ja: "トレンドが見つかりません",
  },
  exploreAvailableIds: {
    en: "Available IDs",
    ja: "利用可能なID",
  },

  // Mix
  mixNoTrends: {
    en: 'Please provide two trend names to mix. Example:\n  designnn mix "Bento UI" "Glassmorphism"\n  designnn mix bento-ui glassmorphism',
    ja: 'ミックスする2つのトレンド名を入力してください。例：\n  designnn mix "Bento UI" "Glassmorphism"\n  designnn mix bento-ui glassmorphism',
  },
  mixTrendNotFound: {
    en: "Trend not found",
    ja: "トレンドが見つかりません",
  },
  mixMixing: {
    en: "Mixing Trends",
    ja: "トレンドをミックス中",
  },
  mixTrendA: {
    en: "Trend A:",
    ja: "トレンドA：",
  },
  mixTrendB: {
    en: "Trend B:",
    ja: "トレンドB：",
  },
  mixContext: {
    en: "Context",
    ja: "コンテキスト",
  },
  mixGenerating: {
    en: "Mixing into a Figma AI prompt...",
    ja: "Figma AIプロンプトにミックス中...",
  },
  mixResult: {
    en: "Mix",
    ja: "ミックス",
  },
  mixDidYouMean: {
    en: "Did you mean:",
    ja: "もしかして：",
  },
  mixAvailableTrends: {
    en: "Available trends:",
    ja: "利用可能なトレンド：",
  },
  mixSeeAll: {
    en: "Use 'designnn explore' to see all trends.",
    ja: "'designnn explore' で全トレンドを表示できます。",
  },

  // Stats
  statsTitle: {
    en: "Trend Database Statistics",
    ja: "トレンドデータベース統計",
  },
  statsOverview: {
    en: "Overview",
    ja: "概要",
  },
  statsTotalTrends: {
    en: "Total Trends",
    ja: "総トレンド数",
  },
  statsBuiltin: {
    en: "Built-in",
    ja: "ビルトイン",
  },
  statsAiGenerated: {
    en: "AI-Generated",
    ja: "AI生成",
  },
  statsUserAdded: {
    en: "User-Added",
    ja: "ユーザー追加",
  },
  statsByCategory: {
    en: "By Category",
    ja: "カテゴリ別",
  },
  statsTop5: {
    en: "Top 5 Trends",
    ja: "トップ5トレンド",
  },
  statsRecentlyAdded: {
    en: "Recently Added",
    ja: "最近追加されたトレンド",
  },
  statsTipUpdate: {
    en: "Tip: Run 'designnn update' to research and add new trends",
    ja: "ヒント: 'designnn update' で新しいトレンドをリサーチ・追加できます",
  },
  statsTipReset: {
    en: "Tip: Run 'designnn update --reset' to clear custom trends",
    ja: "ヒント: 'designnn update --reset' でカスタムトレンドをリセットできます",
  },

  // Display
  generatedPrompt: {
    en: "Generated Prompt",
    ja: "生成されたプロンプト",
  },
  copyHint: {
    en: "Copy the prompt above and paste it into Figma AI (Ctrl+I)",
    ja: "上のプロンプトをコピーしてFigma AI（Ctrl+I）に貼り付けてください",
  },
  keywords: {
    en: "Keywords",
    ja: "キーワード",
  },

  // Serve
  serveStarting: {
    en: "DESIGNNN Web UI running at",
    ja: "DESIGNNN Web UI 起動中：",
  },

  // Category names
  catStyle: { en: "style", ja: "スタイル" },
  catComponent: { en: "component", ja: "コンポーネント" },
  catPattern: { en: "pattern", ja: "パターン" },
  catLayout: { en: "layout", ja: "レイアウト" },
  catInteraction: { en: "interaction", ja: "インタラクション" },
};

export function t(key: string): string {
  const msg = messages[key];
  if (!msg) return key;
  return msg[currentLang] || msg.en;
}

export function getCategoryName(category: string): string {
  const key = `cat${category.charAt(0).toUpperCase() + category.slice(1)}`;
  return t(key);
}
