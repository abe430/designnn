// ============================================
// DESIGNNN i18n — Internationalization Module
// ============================================

const I18N = {
  en: {
    // Header
    tagline: "for Figma AI",

    // Nav
    navChat: "Chat",
    navExplore: "Explore",
    navMix: "Mix",
    navStats: "Stats",

    // Chat Tab
    chatTitle: "Chat to Prompt",
    chatDesc: 'Describe what you want to design. DESIGNNN will generate an optimized Figma AI prompt powered by <span class="highlight">{count} design trends</span>.',
    chatPlaceholder: "e.g., SaaS dashboard with analytics charts and dark theme",
    chatGenerate: "Generate",
    chatGenerating: "Generating...",
    chatLoading: "Generating prompt with AI...",
    chatQuickLabel: "Try:",
    chatQuickPrompts: [
      { label: "Fitness Landing", prompt: "Landing page for a fitness app with bold typography" },
      { label: "E-commerce Glass", prompt: "E-commerce product page with glassmorphism style" },
      { label: "Meditation App", prompt: "Mobile onboarding flow for a meditation app" },
      { label: "SaaS Pricing", prompt: "SaaS pricing page with dark theme and neon accents" },
      { label: "Bento Dashboard", prompt: "Dashboard with bento grid layout and data visualization" },
      { label: "Retrofuturism Portfolio", prompt: "Portfolio website with retrofuturism aesthetic" },
    ],

    // Explore Tab
    exploreTitle: "Explore Trends",
    exploreDesc: 'Browse <span class="highlight" id="trend-count">{count}</span> curated UI/UX design trends. Click any trend to generate a Figma AI prompt.',
    exploreSearchPlaceholder: "Search trends...",
    exploreFilterAll: "All",
    exploreFilterStyle: "Style",
    exploreFilterComponent: "Component",
    exploreFilterPattern: "Pattern",
    exploreFilterLayout: "Layout",
    exploreFilterInteraction: "Interaction",
    exploreShowing: "Showing {shown} of {total} trends",
    exploreNoResults: "No trends found matching your criteria.",
    exploreGenerateBtn: "Generate Prompt",

    // Mix Tab
    mixTitle: "Trend Mixer",
    mixDesc: "Combine two design trends into something fresh. Cross-pollinate styles for innovative UI.",
    mixTrend1: "Trend 1",
    mixTrend2: "Trend 2",
    mixSelectPlaceholder: "Select a trend...",
    mixContextPlaceholder: "Additional context (optional): e.g., for a music streaming app",
    mixGenerate: "Mix & Generate",
    mixMixing: "Mixing...",
    mixErrorSelect: "Please select two trends to mix.",
    mixErrorSame: "Please select two different trends.",

    // Stats Tab
    statsTitle: "Database Stats",
    statsDesc: "Overview of the DESIGNNN trend database.",
    statsTotalTrends: "Total Trends",
    statsBuiltin: "Built-in",
    statsAiGenerated: "AI-Generated",
    statsCategories: "Categories",
    statsByCategory: "Trends by Category",
    statsLoading: "Loading stats...",

    // Results
    resultGenerated: "Generated Prompt",
    resultCopy: "Copy",
    resultCopied: "Copied!",
    resultPasteHint: "Paste into Figma AI (Ctrl+I / Cmd+I)",
    resultWords: "words",
    resultPromptFor: 'Prompt for: "{message}"',
    resultTrend: "Trend: {name}",
    resultMix: "Mix: {name1} + {name2}",

    // Errors
    errorFailed: "Failed to generate",
    errorLoadTrends: "Failed to load trends",
    errorLoadStats: "Failed to load stats",

    // Footer
    footerText: "DESIGNNN v{version} — Trend-driven design prompt engine",
    footerMadeBy: "Made by",
  },

  ja: {
    // Header
    tagline: "for Figma AI",

    // Nav
    navChat: "チャット",
    navExplore: "トレンド",
    navMix: "ミックス",
    navStats: "統計",

    // Chat Tab
    chatTitle: "チャットでプロンプト生成",
    chatDesc: '作りたいデザインを自然言語で入力してください。DESIGNNNが<span class="highlight">{count}以上のデザイントレンド</span>を活用し、最適なFigma AIプロンプトを生成します。',
    chatPlaceholder: "例：ダッシュボードUI、ダークテーマ、分析チャート付き",
    chatGenerate: "生成する",
    chatGenerating: "生成中...",
    chatLoading: "AIがプロンプトを生成中...",
    chatQuickLabel: "試してみる：",
    chatQuickPrompts: [
      { label: "フィットネスLP", prompt: "Landing page for a fitness app with bold typography" },
      { label: "ECサイト ガラス風", prompt: "E-commerce product page with glassmorphism style" },
      { label: "瞑想アプリ", prompt: "Mobile onboarding flow for a meditation app" },
      { label: "SaaS料金ページ", prompt: "SaaS pricing page with dark theme and neon accents" },
      { label: "Bentoダッシュボード", prompt: "Dashboard with bento grid layout and data visualization" },
      { label: "レトロフューチャー", prompt: "Portfolio website with retrofuturism aesthetic" },
    ],

    // Explore Tab
    exploreTitle: "トレンドを探索",
    exploreDesc: '<span class="highlight" id="trend-count">{count}</span>件の厳選されたUI/UXデザイントレンドを閲覧できます。トレンドをクリックしてFigma AIプロンプトを生成しましょう。',
    exploreSearchPlaceholder: "トレンドを検索...",
    exploreFilterAll: "すべて",
    exploreFilterStyle: "スタイル",
    exploreFilterComponent: "コンポーネント",
    exploreFilterPattern: "パターン",
    exploreFilterLayout: "レイアウト",
    exploreFilterInteraction: "インタラクション",
    exploreShowing: "{total}件中 {shown}件を表示",
    exploreNoResults: "条件に一致するトレンドが見つかりませんでした。",
    exploreGenerateBtn: "プロンプト生成",

    // Mix Tab
    mixTitle: "トレンドミキサー",
    mixDesc: "2つのデザイントレンドを掛け合わせて、新しいスタイルを生み出します。異なるスタイルの融合で革新的なUIを。",
    mixTrend1: "トレンド 1",
    mixTrend2: "トレンド 2",
    mixSelectPlaceholder: "トレンドを選択...",
    mixContextPlaceholder: "追加コンテキスト（任意）：例）音楽ストリーミングアプリ向け",
    mixGenerate: "ミックス＆生成",
    mixMixing: "ミックス中...",
    mixErrorSelect: "ミックスする2つのトレンドを選択してください。",
    mixErrorSame: "異なる2つのトレンドを選択してください。",

    // Stats Tab
    statsTitle: "データベース統計",
    statsDesc: "DESIGNNNトレンドデータベースの概要です。",
    statsTotalTrends: "トレンド総数",
    statsBuiltin: "ビルトイン",
    statsAiGenerated: "AI生成",
    statsCategories: "カテゴリ数",
    statsByCategory: "カテゴリ別トレンド数",
    statsLoading: "統計を読み込み中...",

    // Results
    resultGenerated: "生成されたプロンプト",
    resultCopy: "コピー",
    resultCopied: "コピー済み！",
    resultPasteHint: "Figma AIに貼り付け（Ctrl+I / Cmd+I）",
    resultWords: "語",
    resultPromptFor: '「{message}」のプロンプト',
    resultTrend: "トレンド：{name}",
    resultMix: "ミックス：{name1} + {name2}",

    // Errors
    errorFailed: "生成に失敗しました",
    errorLoadTrends: "トレンドの読み込みに失敗しました",
    errorLoadStats: "統計の読み込みに失敗しました",

    // Footer
    footerText: "DESIGNNN v{version} — トレンド駆動型デザインプロンプトエンジン",
    footerMadeBy: "開発",
  },
};

// --- Language Detection & State ---
let currentLang = "en";

function detectLanguage() {
  // Check localStorage first
  const saved = localStorage.getItem("designnn-lang");
  if (saved && I18N[saved]) return saved;

  // Auto-detect from browser
  const browserLang = navigator.language || navigator.userLanguage || "en";
  if (browserLang.startsWith("ja")) return "ja";
  return "en";
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("designnn-lang", lang);
}

function t(key, params) {
  let text = I18N[currentLang]?.[key] || I18N.en[key] || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(new RegExp(`\\{${k}\\}`, "g"), v);
    });
  }
  return text;
}

// Export for use in app.js
window.I18N = I18N;
window.currentLang = currentLang;
window.detectLanguage = detectLanguage;
window.setLanguage = setLanguage;
window.t = t;
