export interface Trend {
  id: string;
  name: string;
  category: "style" | "component" | "pattern" | "layout" | "interaction";
  description: string;
  keywords: string[];
  popularity: number; // 1-100
  year: number;
  figmaPromptHints: string[];
}

export const TRENDS: Trend[] = [
  // === Styles ===
  {
    id: "bento-ui",
    name: "Bento UI",
    category: "style",
    description: "Grid-based layout inspired by Japanese bento boxes. Asymmetric card grids with varying sizes create visual hierarchy and information density.",
    keywords: ["bento", "grid", "cards", "asymmetric", "dashboard"],
    popularity: 95,
    year: 2026,
    figmaPromptHints: [
      "Use asymmetric grid layout with cards of varying sizes",
      "Mix 1x1, 2x1, and 2x2 card sizes",
      "Add subtle rounded corners (16px) and soft shadows",
      "Use consistent padding (24px) between grid items",
    ],
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    category: "style",
    description: "Frosted glass effect with background blur, transparency, and subtle borders. Creates depth and layering in UI.",
    keywords: ["glass", "blur", "transparent", "frosted", "depth"],
    popularity: 82,
    year: 2026,
    figmaPromptHints: [
      "Apply frosted glass effect with background blur (20px)",
      "Use semi-transparent white backgrounds (rgba 255,255,255,0.15)",
      "Add 1px border with rgba(255,255,255,0.2)",
      "Layer elements over colorful or gradient backgrounds",
    ],
  },
  {
    id: "neubrutalism",
    name: "Neubrutalism",
    category: "style",
    description: "Bold, raw aesthetic with thick borders, strong shadows, and high-contrast colors. Anti-minimalist approach with intentional roughness.",
    keywords: ["brutal", "bold", "thick-border", "raw", "contrast"],
    popularity: 78,
    year: 2026,
    figmaPromptHints: [
      "Use thick black borders (3-4px) on all elements",
      "Apply hard drop shadows (4px 4px 0px #000)",
      "Choose high-contrast, saturated color palette",
      "Use monospace or display fonts for headings",
    ],
  },
  {
    id: "organic-shapes",
    name: "Organic Shapes",
    category: "style",
    description: "Fluid, blob-like shapes and curved elements that create a natural, approachable feel. Moves away from rigid geometric forms.",
    keywords: ["organic", "blob", "fluid", "curves", "natural"],
    popularity: 72,
    year: 2026,
    figmaPromptHints: [
      "Use blob-like background shapes with soft curves",
      "Apply organic, flowing illustrations",
      "Rounded corners on all containers (20px+)",
      "Gradient fills on organic shape elements",
    ],
  },
  {
    id: "dark-mode-first",
    name: "Dark Mode First",
    category: "style",
    description: "Designing with dark backgrounds as the primary palette. Uses carefully chosen accent colors and subtle gradients for depth.",
    keywords: ["dark", "night", "black", "contrast", "glow"],
    popularity: 90,
    year: 2026,
    figmaPromptHints: [
      "Use dark background (#0A0A0A or #121212)",
      "Apply subtle gradient overlays for depth",
      "Use bright accent colors sparingly for CTAs",
      "Ensure WCAG AAA contrast ratios for text",
    ],
  },
  {
    id: "kinetic-typography",
    name: "Kinetic Typography",
    category: "style",
    description: "Large, expressive typography as the primary design element. Text becomes the hero with varying sizes, weights, and creative layouts.",
    keywords: ["typography", "text", "large-type", "expressive", "hero"],
    popularity: 85,
    year: 2026,
    figmaPromptHints: [
      "Use oversized display typography (80px+) for hero sections",
      "Mix font weights dramatically (100 vs 900)",
      "Apply text as the primary visual element",
      "Use variable fonts for fluid weight transitions",
    ],
  },
  // === Components ===
  {
    id: "floating-action-bar",
    name: "Floating Action Bar",
    category: "component",
    description: "A persistent floating toolbar at the bottom of the screen with contextual actions. Replaces traditional fixed bottom navigation.",
    keywords: ["floating", "toolbar", "action", "bottom", "navigation"],
    popularity: 88,
    year: 2026,
    figmaPromptHints: [
      "Place a floating pill-shaped bar at the bottom center",
      "Use backdrop blur and semi-transparent background",
      "Include 3-5 icon actions with labels on hover",
      "Add subtle shadow and rounded corners (999px)",
    ],
  },
  {
    id: "skeleton-loading",
    name: "Skeleton Loading",
    category: "component",
    description: "Animated placeholder content that mimics the layout of actual content while loading. Reduces perceived wait time.",
    keywords: ["skeleton", "loading", "placeholder", "shimmer", "progressive"],
    popularity: 91,
    year: 2026,
    figmaPromptHints: [
      "Show gray placeholder blocks matching content layout",
      "Use subtle shimmer animation (left to right gradient)",
      "Match exact dimensions of final content elements",
      "Use rounded rectangles for text placeholders",
    ],
  },
  {
    id: "command-palette",
    name: "Command Palette (⌘K)",
    category: "component",
    description: "A keyboard-triggered search and command interface. Power-user feature that provides quick access to all app functions.",
    keywords: ["command", "palette", "search", "keyboard", "cmdk"],
    popularity: 87,
    year: 2026,
    figmaPromptHints: [
      "Center a modal search bar with backdrop overlay",
      "Include categorized results with keyboard shortcuts",
      "Add recent searches and suggested actions",
      "Use monospace font for keyboard shortcut badges",
    ],
  },
  {
    id: "micro-interactions",
    name: "Micro-interactions",
    category: "interaction",
    description: "Small, purposeful animations that provide feedback, guide users, and add delight. Button hovers, toggle switches, success states.",
    keywords: ["animation", "micro", "feedback", "hover", "transition"],
    popularity: 93,
    year: 2026,
    figmaPromptHints: [
      "Design hover states for all interactive elements",
      "Include pressed/active states with scale reduction",
      "Add success/error state animations",
      "Use spring-based easing curves for natural feel",
    ],
  },
  // === Patterns ===
  {
    id: "saas-pricing",
    name: "SaaS Pricing Page",
    category: "pattern",
    description: "Modern pricing comparison layout with tiered plans, feature matrices, and annual/monthly toggle. Highlights recommended plan.",
    keywords: ["pricing", "saas", "plans", "subscription", "comparison"],
    popularity: 89,
    year: 2026,
    figmaPromptHints: [
      "Create 3 pricing cards side by side (Starter, Pro, Enterprise)",
      "Highlight the middle 'Pro' card as recommended with accent border",
      "Add monthly/annual toggle with 'Save 20%' badge",
      "Include feature comparison checklist below each plan",
      "Use clear CTA buttons with contrasting colors",
    ],
  },
  {
    id: "onboarding-flow",
    name: "Progressive Onboarding",
    category: "pattern",
    description: "Step-by-step onboarding that collects user preferences and personalizes the experience. Uses progress indicators and conversational UI.",
    keywords: ["onboarding", "wizard", "steps", "welcome", "setup"],
    popularity: 86,
    year: 2026,
    figmaPromptHints: [
      "Design a multi-step wizard with progress bar at top",
      "Use large illustrations for each step",
      "Include skip option and back navigation",
      "Add conversational tone to instructions",
    ],
  },
  {
    id: "dashboard-analytics",
    name: "Analytics Dashboard",
    category: "pattern",
    description: "Data-rich dashboard with KPI cards, charts, and filters. Combines Bento grid layout with real-time data visualization.",
    keywords: ["dashboard", "analytics", "charts", "kpi", "data"],
    popularity: 92,
    year: 2026,
    figmaPromptHints: [
      "Use Bento grid layout with KPI cards at top",
      "Include line chart, bar chart, and donut chart",
      "Add date range picker and filter controls",
      "Use consistent data visualization color palette",
      "Include sidebar navigation with collapsible sections",
    ],
  },
  {
    id: "auth-minimal",
    name: "Minimal Authentication",
    category: "pattern",
    description: "Clean, distraction-free login/signup with social auth options, passwordless magic links, and split-screen layout.",
    keywords: ["login", "signup", "auth", "authentication", "register"],
    popularity: 84,
    year: 2026,
    figmaPromptHints: [
      "Use split-screen layout: illustration left, form right",
      "Include social login buttons (Google, GitHub, Apple)",
      "Add magic link / passwordless option",
      "Minimal form fields with inline validation",
      "Use brand illustration or gradient on the left panel",
    ],
  },
  // === Layouts ===
  {
    id: "hero-split",
    name: "Split Hero Section",
    category: "layout",
    description: "Hero section divided into two columns: text/CTA on one side, visual (image, illustration, or 3D) on the other.",
    keywords: ["hero", "split", "landing", "above-fold", "headline"],
    popularity: 88,
    year: 2026,
    figmaPromptHints: [
      "Split the hero section 50/50 or 60/40",
      "Place headline, subtext, and CTA on the left",
      "Use product screenshot or 3D illustration on the right",
      "Add subtle background gradient or pattern",
    ],
  },
  {
    id: "sidebar-nav",
    name: "Collapsible Sidebar Navigation",
    category: "layout",
    description: "Left sidebar navigation that can collapse to icons-only mode. Standard for SaaS and dashboard applications.",
    keywords: ["sidebar", "navigation", "menu", "collapse", "saas"],
    popularity: 90,
    year: 2026,
    figmaPromptHints: [
      "Design a left sidebar with icon + label navigation items",
      "Include collapsed state showing icons only",
      "Add user avatar and settings at the bottom",
      "Use subtle hover and active states for menu items",
      "Include section dividers and group labels",
    ],
  },
  {
    id: "mobile-bottom-sheet",
    name: "Mobile Bottom Sheet",
    category: "layout",
    description: "Draggable bottom panel for mobile interfaces. Replaces traditional modals with a more natural, thumb-friendly interaction.",
    keywords: ["bottom-sheet", "mobile", "drawer", "panel", "modal"],
    popularity: 83,
    year: 2026,
    figmaPromptHints: [
      "Design a bottom sheet with drag handle at top",
      "Show peek state (30% height) and expanded state (80%)",
      "Use rounded top corners (20px)",
      "Include dimmed backdrop overlay",
      "Add swipe-to-dismiss gesture indicator",
    ],
  },
  {
    id: "responsive-cards",
    name: "Responsive Card Grid",
    category: "layout",
    description: "Adaptive card-based layout that reflows from multi-column to single-column based on viewport. Foundation of modern content layouts.",
    keywords: ["cards", "grid", "responsive", "adaptive", "content"],
    popularity: 94,
    year: 2026,
    figmaPromptHints: [
      "Design a 3-column card grid with consistent spacing (24px)",
      "Each card: image top, title, description, CTA",
      "Use 16px rounded corners and subtle shadow",
      "Show responsive breakpoints: desktop (3col), tablet (2col), mobile (1col)",
    ],
  },
];

export function searchTrends(query: string): Trend[] {
  const q = query.toLowerCase();
  return TRENDS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.includes(q)) ||
      t.category.includes(q)
  ).sort((a, b) => b.popularity - a.popularity);
}

export function getTrendById(id: string): Trend | undefined {
  return TRENDS.find((t) => t.id === id);
}

export function getTrendsByCategory(category: Trend["category"]): Trend[] {
  return TRENDS.filter((t) => t.category === category).sort(
    (a, b) => b.popularity - a.popularity
  );
}

export function getTopTrends(limit: number = 10): Trend[] {
  return [...TRENDS].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}
