export interface Trend {
  id: string;
  name: string;
  category: "style" | "component" | "pattern" | "layout" | "interaction";
  description: string;
  keywords: string[];
  popularity: number; // 1-100
  year: number;
  figmaPromptHints: string[];
  source?: "builtin" | "ai-generated" | "user"; // origin of the trend
  addedAt?: string; // ISO date string
}

// ============================================
// Built-in Trend Database
// ============================================

export const BUILTIN_TRENDS: Trend[] = [
  // ===========================
  // STYLES (15)
  // ===========================
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
    source: "builtin",
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
    source: "builtin",
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
    source: "builtin",
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
    source: "builtin",
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
    source: "builtin",
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
    source: "builtin",
  },
  {
    id: "aurora-gradients",
    name: "Aurora Gradients",
    category: "style",
    description: "Multi-color gradient backgrounds inspired by the Northern Lights. Soft, flowing color transitions with mesh gradient techniques.",
    keywords: ["aurora", "gradient", "mesh", "colorful", "background"],
    popularity: 80,
    year: 2026,
    figmaPromptHints: [
      "Use mesh gradients with 3-4 soft colors blending together",
      "Apply aurora-like color palette: purple, teal, pink, blue",
      "Use as full-page background or card accent",
      "Keep foreground elements simple to let gradient shine",
    ],
    source: "builtin",
  },
  {
    id: "claymorphism",
    name: "Claymorphism",
    category: "style",
    description: "3D clay-like UI elements with soft, inflated appearance. Combines inner shadows, pastel colors, and rounded shapes for a tactile feel.",
    keywords: ["clay", "3d", "soft", "pastel", "inflated"],
    popularity: 68,
    year: 2026,
    figmaPromptHints: [
      "Use pastel color palette with soft inner shadows",
      "Apply large border-radius (24px+) for inflated look",
      "Add subtle inner shadow for 3D depth effect",
      "Use light background with slightly darker element fills",
    ],
    source: "builtin",
  },
  {
    id: "retro-pixel",
    name: "Retro Pixel / 8-bit",
    category: "style",
    description: "Nostalgic pixel art aesthetic applied to modern UI. Combines retro gaming visuals with contemporary usability.",
    keywords: ["pixel", "retro", "8bit", "gaming", "nostalgic"],
    popularity: 62,
    year: 2026,
    figmaPromptHints: [
      "Use pixel art icons and illustrations",
      "Apply monospace or pixel fonts for headings",
      "Use limited color palette (8-16 colors)",
      "Add pixelated borders and decorative elements",
    ],
    source: "builtin",
  },
  {
    id: "minimalist-mono",
    name: "Minimalist Monochrome",
    category: "style",
    description: "Ultra-clean design using a single color plus black and white. Maximum whitespace, minimal elements, typographic hierarchy.",
    keywords: ["minimal", "monochrome", "clean", "whitespace", "simple"],
    popularity: 88,
    year: 2026,
    figmaPromptHints: [
      "Use only black, white, and one accent color",
      "Maximize whitespace between elements",
      "Rely on typography for visual hierarchy",
      "Remove all unnecessary decorative elements",
    ],
    source: "builtin",
  },
  {
    id: "grain-texture",
    name: "Grain & Noise Texture",
    category: "style",
    description: "Subtle film grain or noise overlays that add warmth and tactile quality to digital interfaces. Creates an analog, premium feel.",
    keywords: ["grain", "noise", "texture", "film", "analog"],
    popularity: 74,
    year: 2026,
    figmaPromptHints: [
      "Apply subtle noise/grain texture overlay (5-10% opacity)",
      "Use warm, muted color palette",
      "Combine with large typography and minimal layout",
      "Add grain especially to gradient backgrounds",
    ],
    source: "builtin",
  },
  {
    id: "neumorphism-v2",
    name: "Neumorphism 2.0",
    category: "style",
    description: "Evolved soft UI with better accessibility. Combines subtle embossed/debossed effects with clear interactive affordances.",
    keywords: ["neumorphism", "soft-ui", "emboss", "shadow", "tactile"],
    popularity: 65,
    year: 2026,
    figmaPromptHints: [
      "Use light gray background (#E0E5EC)",
      "Apply dual shadows: light top-left, dark bottom-right",
      "Add clear focus/active states for accessibility",
      "Use subtle inner shadows for pressed/active states",
    ],
    source: "builtin",
  },
  {
    id: "ai-native-aesthetic",
    name: "AI-Native Aesthetic",
    category: "style",
    description: "Design language born from AI tools. Features generated patterns, dynamic compositions, and interfaces that feel computationally crafted.",
    keywords: ["ai", "generative", "computational", "dynamic", "futuristic"],
    popularity: 91,
    year: 2026,
    figmaPromptHints: [
      "Use generative/algorithmic patterns as backgrounds",
      "Apply iridescent or holographic color accents",
      "Include AI-related UI elements: progress bars, confidence indicators",
      "Use clean, technical typography (Inter, SF Pro, Geist)",
    ],
    source: "builtin",
  },
  {
    id: "japandi-design",
    name: "Japandi Design",
    category: "style",
    description: "Fusion of Japanese minimalism and Scandinavian functionality. Warm neutrals, natural materials, and intentional simplicity.",
    keywords: ["japandi", "japanese", "scandinavian", "warm", "natural"],
    popularity: 70,
    year: 2026,
    figmaPromptHints: [
      "Use warm neutral palette: beige, cream, soft brown, charcoal",
      "Apply generous whitespace and breathing room",
      "Use serif + sans-serif font pairing",
      "Include nature-inspired illustrations or photography",
    ],
    source: "builtin",
  },
  {
    id: "maximalism",
    name: "Digital Maximalism",
    category: "style",
    description: "Bold, layered, and visually rich design that embraces complexity. Multiple patterns, colors, and textures coexist in organized chaos.",
    keywords: ["maximalism", "bold", "layered", "complex", "vibrant"],
    popularity: 66,
    year: 2026,
    figmaPromptHints: [
      "Layer multiple visual elements: patterns, gradients, images",
      "Use bold, saturated color combinations",
      "Mix different typography styles and sizes",
      "Create visual density while maintaining readability",
    ],
    source: "builtin",
  },

  // ===========================
  // COMPONENTS (10)
  // ===========================
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
    source: "builtin",
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
    source: "builtin",
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
    source: "builtin",
  },
  {
    id: "toast-notification",
    name: "Toast Notifications",
    category: "component",
    description: "Non-intrusive notification banners that appear temporarily. Supports success, error, warning, and info variants with actions.",
    keywords: ["toast", "notification", "alert", "snackbar", "feedback"],
    popularity: 90,
    year: 2026,
    figmaPromptHints: [
      "Position toasts at top-right or bottom-center",
      "Include icon, message, and optional action button",
      "Design 4 variants: success (green), error (red), warning (amber), info (blue)",
      "Add subtle slide-in animation and auto-dismiss timer",
    ],
    source: "builtin",
  },
  {
    id: "avatar-stack",
    name: "Avatar Stack / Group",
    category: "component",
    description: "Overlapping circular avatars showing team members or collaborators. Includes overflow counter for large groups.",
    keywords: ["avatar", "stack", "team", "users", "collaboration"],
    popularity: 82,
    year: 2026,
    figmaPromptHints: [
      "Stack 3-5 circular avatars with -8px overlap",
      "Add 2px white border ring around each avatar",
      "Include +N overflow counter as last circle",
      "Size options: sm (24px), md (32px), lg (40px)",
    ],
    source: "builtin",
  },
  {
    id: "data-table",
    name: "Advanced Data Table",
    category: "component",
    description: "Feature-rich table with sorting, filtering, pagination, row selection, and inline editing. Essential for SaaS and admin panels.",
    keywords: ["table", "data", "grid", "sorting", "pagination"],
    popularity: 89,
    year: 2026,
    figmaPromptHints: [
      "Design a table with header row, zebra striping, and hover states",
      "Include sort indicators (arrows) in column headers",
      "Add checkbox column for row selection",
      "Include pagination bar with page numbers and items-per-page selector",
      "Add search/filter bar above the table",
    ],
    source: "builtin",
  },
  {
    id: "empty-state",
    name: "Empty State",
    category: "component",
    description: "Friendly, informative placeholder shown when no data is available. Guides users toward their first action.",
    keywords: ["empty", "placeholder", "onboarding", "zero-state", "illustration"],
    popularity: 79,
    year: 2026,
    figmaPromptHints: [
      "Center a friendly illustration (150-200px)",
      "Add clear headline explaining the empty state",
      "Include descriptive subtext with guidance",
      "Add primary CTA button to take first action",
    ],
    source: "builtin",
  },
  {
    id: "ai-chat-interface",
    name: "AI Chat Interface",
    category: "component",
    description: "Conversational UI for AI assistants with message bubbles, typing indicators, suggested prompts, and code blocks.",
    keywords: ["chat", "ai", "conversation", "assistant", "chatbot"],
    popularity: 96,
    year: 2026,
    figmaPromptHints: [
      "Design message bubbles: user (right-aligned, accent color) and AI (left-aligned, neutral)",
      "Include typing indicator with animated dots",
      "Add suggested prompt chips below the input",
      "Support code blocks with syntax highlighting in messages",
      "Include input bar with send button and attachment option",
    ],
    source: "builtin",
  },
  {
    id: "stepper-progress",
    name: "Stepper / Progress Indicator",
    category: "component",
    description: "Multi-step progress indicator showing completed, current, and upcoming steps. Used in wizards, checkouts, and onboarding.",
    keywords: ["stepper", "progress", "steps", "wizard", "indicator"],
    popularity: 83,
    year: 2026,
    figmaPromptHints: [
      "Design horizontal stepper with numbered circles connected by lines",
      "Show 3 states: completed (check icon, filled), current (highlighted), upcoming (outline)",
      "Include step labels below each circle",
      "Use accent color for completed and current steps",
    ],
    source: "builtin",
  },
  {
    id: "contextual-menu",
    name: "Contextual / Right-click Menu",
    category: "component",
    description: "Context-aware dropdown menu triggered by right-click or long-press. Groups related actions with dividers and keyboard shortcuts.",
    keywords: ["context-menu", "dropdown", "right-click", "actions", "menu"],
    popularity: 81,
    year: 2026,
    figmaPromptHints: [
      "Design a floating menu with grouped action items",
      "Include dividers between action groups",
      "Show keyboard shortcuts right-aligned in each row",
      "Add hover state with subtle background highlight",
      "Include icons for common actions (copy, paste, delete)",
    ],
    source: "builtin",
  },

  // ===========================
  // PATTERNS (10)
  // ===========================
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
    source: "builtin",
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
    source: "builtin",
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
    source: "builtin",
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
    source: "builtin",
  },
  {
    id: "settings-page",
    name: "Settings / Preferences Page",
    category: "pattern",
    description: "Organized settings interface with categorized sections, toggle switches, and clear descriptions for each option.",
    keywords: ["settings", "preferences", "config", "options", "account"],
    popularity: 81,
    year: 2026,
    figmaPromptHints: [
      "Use left sidebar for settings categories, content area on right",
      "Group related settings with section headers",
      "Use toggle switches for on/off settings",
      "Include descriptive text below each setting label",
      "Add save/cancel buttons at the bottom or auto-save indicator",
    ],
    source: "builtin",
  },
  {
    id: "ecommerce-pdp",
    name: "E-commerce Product Detail Page",
    category: "pattern",
    description: "Product page with image gallery, variant selector, reviews, and add-to-cart. Optimized for conversion and mobile responsiveness.",
    keywords: ["ecommerce", "product", "shop", "cart", "detail"],
    popularity: 87,
    year: 2026,
    figmaPromptHints: [
      "Split layout: image gallery left (60%), product info right (40%)",
      "Include thumbnail image carousel with zoom capability",
      "Add size/color variant selectors",
      "Show price, rating stars, and review count",
      "Include prominent Add to Cart button and wishlist icon",
    ],
    source: "builtin",
  },
  {
    id: "notification-center",
    name: "Notification Center",
    category: "pattern",
    description: "Centralized notification panel with categorized alerts, read/unread states, and actionable items. Slide-out or dropdown format.",
    keywords: ["notification", "alerts", "inbox", "updates", "bell"],
    popularity: 83,
    year: 2026,
    figmaPromptHints: [
      "Design a slide-out panel from the right side",
      "Group notifications by date (Today, Yesterday, Earlier)",
      "Show unread indicator (blue dot) and read state (dimmed)",
      "Include notification type icons and timestamps",
      "Add 'Mark all as read' and filter options at top",
    ],
    source: "builtin",
  },
  {
    id: "kanban-board",
    name: "Kanban Board",
    category: "pattern",
    description: "Column-based task management board with draggable cards. Supports labels, assignees, due dates, and swimlanes.",
    keywords: ["kanban", "board", "tasks", "project", "drag-drop"],
    popularity: 88,
    year: 2026,
    figmaPromptHints: [
      "Create 4-5 columns: Backlog, To Do, In Progress, Review, Done",
      "Design task cards with title, labels, assignee avatar, and due date",
      "Include column header with task count and add button",
      "Show drag handle indicator on cards",
      "Add color-coded labels for priority/category",
    ],
    source: "builtin",
  },
  {
    id: "file-upload",
    name: "File Upload / Drag & Drop",
    category: "pattern",
    description: "Drag-and-drop file upload zone with progress indicators, file type validation, and upload queue management.",
    keywords: ["upload", "file", "drag-drop", "progress", "attachment"],
    popularity: 80,
    year: 2026,
    figmaPromptHints: [
      "Design a dashed-border drop zone with upload icon",
      "Show drag-over state with highlighted border and background",
      "Include file list with name, size, type icon, and progress bar",
      "Add remove/cancel button for each file",
      "Show supported file types and size limit text",
    ],
    source: "builtin",
  },
  {
    id: "landing-page-saas",
    name: "SaaS Landing Page",
    category: "pattern",
    description: "Complete landing page structure with hero, features, social proof, pricing, and CTA sections. Optimized for conversion.",
    keywords: ["landing", "saas", "marketing", "conversion", "homepage"],
    popularity: 93,
    year: 2026,
    figmaPromptHints: [
      "Hero section: headline, subtext, CTA button, and product screenshot",
      "Logo bar with 5-6 trusted company logos",
      "3-column feature grid with icons and descriptions",
      "Testimonial section with avatar, quote, and company",
      "Final CTA section with contrasting background",
    ],
    source: "builtin",
  },

  // ===========================
  // LAYOUTS (8)
  // ===========================
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
    source: "builtin",
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
    source: "builtin",
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
    source: "builtin",
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
    source: "builtin",
  },
  {
    id: "masonry-layout",
    name: "Masonry / Pinterest Layout",
    category: "layout",
    description: "Variable-height card layout that fills space efficiently like a brick wall. Ideal for image-heavy content and portfolios.",
    keywords: ["masonry", "pinterest", "waterfall", "gallery", "variable-height"],
    popularity: 79,
    year: 2026,
    figmaPromptHints: [
      "Create a multi-column layout with variable-height cards",
      "Use 3-4 columns with 16px gap",
      "Cards contain images of different aspect ratios",
      "Add subtle hover effect with overlay and title",
    ],
    source: "builtin",
  },
  {
    id: "sticky-header",
    name: "Sticky Header with Scroll Transition",
    category: "layout",
    description: "Navigation header that stays fixed on scroll with visual transition: shrinks, adds blur, or changes background on scroll.",
    keywords: ["sticky", "header", "navbar", "fixed", "scroll"],
    popularity: 86,
    year: 2026,
    figmaPromptHints: [
      "Design two header states: expanded (transparent, large) and scrolled (compact, blurred bg)",
      "Include logo, navigation links, and CTA button",
      "Show transition between states",
      "Add backdrop blur effect in scrolled state",
    ],
    source: "builtin",
  },
  {
    id: "full-bleed-sections",
    name: "Full-Bleed Alternating Sections",
    category: "layout",
    description: "Full-width content sections that alternate between light and dark backgrounds. Creates visual rhythm and clear content separation.",
    keywords: ["full-bleed", "sections", "alternating", "landing", "scroll"],
    popularity: 85,
    year: 2026,
    figmaPromptHints: [
      "Alternate between light (#FFFFFF) and dark (#0A0A0A) full-width sections",
      "Each section: 80-120px vertical padding",
      "Center content in max-width container (1200px)",
      "Use contrasting text colors for each section",
    ],
    source: "builtin",
  },
  {
    id: "z-pattern-layout",
    name: "Z-Pattern Feature Layout",
    category: "layout",
    description: "Alternating image-left/text-right and text-left/image-right sections that guide the eye in a Z-pattern down the page.",
    keywords: ["z-pattern", "zigzag", "features", "alternating", "marketing"],
    popularity: 84,
    year: 2026,
    figmaPromptHints: [
      "Alternate image and text placement: left-right, right-left",
      "Each section: feature illustration + headline + description + link",
      "Use consistent spacing (80px) between sections",
      "Add subtle connecting elements between sections",
    ],
    source: "builtin",
  },

  // ===========================
  // 2026 NEW TRENDS (15)
  // ===========================
  {
    id: "3d-immersive",
    name: "3D Immersive Elements",
    category: "style",
    description: "WebGL-powered 3D objects, scroll-triggered 3D animations, and AR previews. Depth and interaction move beyond static images.",
    keywords: ["3d", "webgl", "immersive", "ar", "depth"],
    popularity: 89,
    year: 2026,
    figmaPromptHints: [
      "Include 3D product renders or interactive model placeholders",
      "Use layered depth with parallax scrolling effects",
      "Add perspective transforms on card hover",
      "Design AR preview button with camera icon",
    ],
    source: "builtin",
  },
  {
    id: "experimental-navigation",
    name: "Experimental Navigation",
    category: "interaction",
    description: "Non-linear navigation patterns: radial menus, hidden drawers, interactive maps, and exploration-based journeys.",
    keywords: ["navigation", "radial", "experimental", "nonlinear", "exploration"],
    popularity: 76,
    year: 2026,
    figmaPromptHints: [
      "Design a radial or circular navigation menu",
      "Use hidden drawer navigation revealed by gesture",
      "Create an interactive map-based navigation",
      "Include breadcrumb trail for nonlinear journeys",
    ],
    source: "builtin",
  },
  {
    id: "y2k-vibrant-palette",
    name: "Y2K Vibrant Palette",
    category: "style",
    description: "Bright, saturated color palettes inspired by Y2K nostalgia. Neon gradients, high-contrast pairings, and dopamine design aesthetics.",
    keywords: ["y2k", "vibrant", "neon", "dopamine", "nostalgia"],
    popularity: 83,
    year: 2026,
    figmaPromptHints: [
      "Use saturated neon colors: hot pink, electric blue, lime green",
      "Apply bold gradient combinations across backgrounds",
      "Include Y2K-inspired decorative elements: stars, bubbles, chrome",
      "Use high-contrast color pairings for maximum visual impact",
    ],
    source: "builtin",
  },
  {
    id: "scrollytelling",
    name: "Scrollytelling",
    category: "interaction",
    description: "Scroll-based narrative experiences where content unfolds as the user scrolls. Combines motion, text, and visuals into a story.",
    keywords: ["scroll", "storytelling", "narrative", "motion", "immersive"],
    popularity: 84,
    year: 2026,
    figmaPromptHints: [
      "Design a vertical narrative with scroll-triggered content reveals",
      "Use full-screen sections that transition on scroll",
      "Include progress indicator showing story position",
      "Combine text, images, and data visualizations in sequence",
    ],
    source: "builtin",
  },
  {
    id: "gamified-design",
    name: "Gamified Design",
    category: "pattern",
    description: "Game mechanics applied to UI: points, levels, badges, progress bars, leaderboards, and micro-rewards to boost engagement.",
    keywords: ["gamification", "badges", "points", "leaderboard", "rewards"],
    popularity: 80,
    year: 2026,
    figmaPromptHints: [
      "Include progress bars and level indicators",
      "Design achievement badges with unlock animations",
      "Add streak counters and daily challenge cards",
      "Create a leaderboard component with rank, avatar, and score",
    ],
    source: "builtin",
  },
  {
    id: "retrofuturism",
    name: "Retrofuturism",
    category: "style",
    description: "Vintage visions of the future: neon accents, chrome textures, pixel art, bold gradients inspired by sci-fi and arcade aesthetics.",
    keywords: ["retro", "futurism", "neon", "chrome", "sci-fi"],
    popularity: 72,
    year: 2026,
    figmaPromptHints: [
      "Use neon glow effects on text and borders",
      "Apply chrome/metallic gradient textures",
      "Include retro-futuristic typography with scan lines",
      "Combine dark backgrounds with vibrant neon accents",
    ],
    source: "builtin",
  },
  {
    id: "collage-design",
    name: "Collage Design",
    category: "style",
    description: "Scrapbook-style creativity with sticker graphics, torn textures, cutout photos, and hand-drawn elements. Messy on purpose.",
    keywords: ["collage", "scrapbook", "cutout", "handmade", "texture"],
    popularity: 68,
    year: 2026,
    figmaPromptHints: [
      "Layer cutout photos with torn paper edges",
      "Add sticker-like decorative elements",
      "Use hand-drawn fonts and doodle illustrations",
      "Mix textures: paper, tape, stamps, ink splashes",
    ],
    source: "builtin",
  },
  {
    id: "sustainable-web",
    name: "Sustainable Web Design",
    category: "pattern",
    description: "Eco-conscious design: optimized assets, reduced data transfer, dark themes for energy saving, and accessibility-first approach.",
    keywords: ["sustainable", "eco", "green", "accessible", "performance"],
    popularity: 71,
    year: 2026,
    figmaPromptHints: [
      "Use system fonts and minimal custom assets",
      "Design with dark mode default for OLED energy saving",
      "Include accessibility indicators: contrast ratios, focus states",
      "Minimize decorative elements, maximize content clarity",
    ],
    source: "builtin",
  },
  {
    id: "voice-ui",
    name: "Voice UI Interface",
    category: "component",
    description: "Voice-activated interface elements: waveform visualizers, voice command indicators, and conversational voice assistants.",
    keywords: ["voice", "speech", "audio", "waveform", "assistant"],
    popularity: 74,
    year: 2026,
    figmaPromptHints: [
      "Design a voice input button with pulsing animation",
      "Include audio waveform visualizer during speech",
      "Show voice command suggestions as floating chips",
      "Add visual feedback states: listening, processing, responding",
    ],
    source: "builtin",
  },
  {
    id: "agentic-ai-ui",
    name: "Agentic AI Interface",
    category: "pattern",
    description: "UI for autonomous AI agents: task delegation, progress monitoring, approval workflows, and multi-step agent pipelines.",
    keywords: ["agent", "ai", "autonomous", "workflow", "pipeline"],
    popularity: 92,
    year: 2026,
    figmaPromptHints: [
      "Design a task pipeline view with agent status indicators",
      "Include approval/rejection buttons for agent actions",
      "Show real-time progress with step-by-step breakdown",
      "Add confidence scores and decision explanations",
    ],
    source: "builtin",
  },
  {
    id: "sensory-maximalism",
    name: "Sensory Maximalism",
    category: "style",
    description: "Multi-sensory design that engages all senses: rich textures, bold colors, dynamic motion, and immersive high-energy compositions.",
    keywords: ["sensory", "maximalism", "immersive", "texture", "energy"],
    popularity: 75,
    year: 2026,
    figmaPromptHints: [
      "Layer multiple textures: gradients, grain, patterns",
      "Use bold, clashing color combinations intentionally",
      "Include dynamic motion indicators and animated elements",
      "Create visual density with overlapping elements",
    ],
    source: "builtin",
  },
  {
    id: "spatial-design",
    name: "Spatial Design (visionOS)",
    category: "layout",
    description: "Design for spatial computing: floating windows, depth layers, glass materials, and eye-tracking interactions for Apple Vision Pro.",
    keywords: ["spatial", "visionos", "ar", "vr", "floating"],
    popularity: 78,
    year: 2026,
    figmaPromptHints: [
      "Design floating window panels with glass material",
      "Use depth layers with z-axis spacing between elements",
      "Apply frosted glass with high blur and transparency",
      "Include gaze-based hover states and hand gesture indicators",
    ],
    source: "builtin",
  },
  {
    id: "variable-fonts",
    name: "Variable Font Typography",
    category: "style",
    description: "Dynamic typography using variable fonts that respond to interaction, scroll position, or data. Fluid weight and width transitions.",
    keywords: ["variable-font", "typography", "fluid", "responsive", "dynamic"],
    popularity: 77,
    year: 2026,
    figmaPromptHints: [
      "Use variable fonts with dramatic weight changes (100-900)",
      "Apply fluid font sizes that scale with viewport",
      "Design text that changes weight on hover or scroll",
      "Combine ultra-thin and ultra-bold weights in same layout",
    ],
    source: "builtin",
  },
  {
    id: "tactile-ui",
    name: "Tactile / Squishy UI",
    category: "interaction",
    description: "UI elements that feel physically responsive: bouncy animations, elastic deformations, and pressure-sensitive interactions.",
    keywords: ["tactile", "squishy", "bounce", "elastic", "physical"],
    popularity: 73,
    year: 2026,
    figmaPromptHints: [
      "Design buttons with spring-bounce press animation",
      "Use elastic deformation on drag interactions",
      "Include rubber-band scroll overscroll effects",
      "Apply soft, inflated appearance with subtle inner shadows",
    ],
    source: "builtin",
  },
  {
    id: "ai-design-system",
    name: "AI-Generated Design System",
    category: "pattern",
    description: "Design systems that adapt and generate components dynamically using AI. Self-evolving tokens, auto-generated variants, and smart theming.",
    keywords: ["design-system", "ai", "tokens", "auto-generate", "adaptive"],
    popularity: 86,
    year: 2026,
    figmaPromptHints: [
      "Design a token-based system with color, spacing, and type scales",
      "Include auto-generated component variants grid",
      "Show theme switching with AI-suggested palettes",
      "Add component documentation with usage guidelines",
    ],
    source: "builtin",
  },

  // ===========================
  // INTERACTIONS (7)
  // ===========================
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
    source: "builtin",
  },
  {
    id: "scroll-animations",
    name: "Scroll-triggered Animations",
    category: "interaction",
    description: "Elements that animate into view as the user scrolls. Fade-in, slide-up, and parallax effects create engaging scroll experiences.",
    keywords: ["scroll", "parallax", "fade-in", "reveal", "animation"],
    popularity: 87,
    year: 2026,
    figmaPromptHints: [
      "Design before/after states for scroll-triggered elements",
      "Show fade-in-up animation: start 20px below, opacity 0 → visible",
      "Stagger animation timing for grouped elements",
      "Include parallax effect for background images",
    ],
    source: "builtin",
  },
  {
    id: "gesture-navigation",
    name: "Gesture-based Navigation",
    category: "interaction",
    description: "Swipe, pinch, and drag gestures for mobile navigation. Replaces button taps with natural touch interactions.",
    keywords: ["gesture", "swipe", "touch", "mobile", "drag"],
    popularity: 81,
    year: 2026,
    figmaPromptHints: [
      "Design swipe-left to delete with red reveal background",
      "Show swipe-right to archive with green reveal",
      "Include gesture hint indicators for first-time users",
      "Design pull-to-refresh animation at top",
    ],
    source: "builtin",
  },
  {
    id: "haptic-feedback-design",
    name: "Haptic Feedback Design",
    category: "interaction",
    description: "Visual representations of tactile feedback. Design cues that suggest physical responses like button presses, toggles, and confirmations.",
    keywords: ["haptic", "tactile", "feedback", "physical", "press"],
    popularity: 73,
    year: 2026,
    figmaPromptHints: [
      "Design button with clear pressed state (scale 0.95, darker shade)",
      "Show toggle switch with smooth transition animation",
      "Include ripple effect on tap for material-style feedback",
      "Design confirmation animation with checkmark bounce",
    ],
    source: "builtin",
  },
  {
    id: "dark-light-toggle",
    name: "Dark/Light Mode Toggle",
    category: "interaction",
    description: "Smooth transition between dark and light color schemes. Includes animated toggle switch and seamless color transitions.",
    keywords: ["dark-mode", "light-mode", "toggle", "theme", "switch"],
    popularity: 89,
    year: 2026,
    figmaPromptHints: [
      "Design a toggle switch with sun/moon icons",
      "Show both dark and light versions of the same screen",
      "Use smooth color transition between modes",
      "Ensure all elements maintain contrast in both modes",
    ],
    source: "builtin",
  },
  {
    id: "infinite-scroll",
    name: "Infinite Scroll with Loading",
    category: "interaction",
    description: "Continuous content loading as user scrolls. Includes loading indicators, skeleton states, and end-of-content messaging.",
    keywords: ["infinite-scroll", "lazy-load", "pagination", "feed", "continuous"],
    popularity: 85,
    year: 2026,
    figmaPromptHints: [
      "Show content feed with cards/posts",
      "Include loading spinner or skeleton at the bottom",
      "Design 'You've reached the end' state",
      "Add scroll-to-top floating button",
    ],
    source: "builtin",
  },
  {
    id: "drag-reorder",
    name: "Drag to Reorder",
    category: "interaction",
    description: "Draggable list items that can be reordered by the user. Includes grab handles, drop indicators, and smooth repositioning.",
    keywords: ["drag", "reorder", "sortable", "list", "handle"],
    popularity: 80,
    year: 2026,
    figmaPromptHints: [
      "Design list items with 6-dot grab handle on the left",
      "Show dragging state: elevated card with shadow, slight rotation",
      "Include drop zone indicator (blue line between items)",
      "Show before and after states of the reorder",
    ],
    source: "builtin",
  },
];

// ============================================
// Dynamic Trend Storage (user & AI-generated)
// ============================================

import fs from "fs";
import path from "path";
import os from "os";

const CUSTOM_TRENDS_DIR = path.join(os.homedir(), ".designnn");
const CUSTOM_TRENDS_FILE = path.join(CUSTOM_TRENDS_DIR, "custom-trends.json");

function ensureCustomDir(): void {
  if (!fs.existsSync(CUSTOM_TRENDS_DIR)) {
    fs.mkdirSync(CUSTOM_TRENDS_DIR, { recursive: true });
  }
}

export function loadCustomTrends(): Trend[] {
  try {
    if (fs.existsSync(CUSTOM_TRENDS_FILE)) {
      const data = fs.readFileSync(CUSTOM_TRENDS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // If file is corrupted, return empty
  }
  return [];
}

export function saveCustomTrends(trends: Trend[]): void {
  ensureCustomDir();
  fs.writeFileSync(CUSTOM_TRENDS_FILE, JSON.stringify(trends, null, 2), "utf-8");
}

export function addCustomTrend(trend: Trend): void {
  const customs = loadCustomTrends();
  // Replace if same id exists
  const idx = customs.findIndex((t) => t.id === trend.id);
  if (idx >= 0) {
    customs[idx] = trend;
  } else {
    customs.push(trend);
  }
  saveCustomTrends(customs);
}

export function removeCustomTrend(id: string): boolean {
  const customs = loadCustomTrends();
  const filtered = customs.filter((t) => t.id !== id);
  if (filtered.length === customs.length) return false;
  saveCustomTrends(filtered);
  return true;
}

// ============================================
// Unified Trend Access (builtin + custom)
// ============================================

export function getAllTrends(): Trend[] {
  return [...BUILTIN_TRENDS, ...loadCustomTrends()];
}

// Keep TRENDS as a getter for backward compatibility
export const TRENDS = getAllTrends();

export function searchTrends(query: string): Trend[] {
  const q = query.toLowerCase();
  return getAllTrends()
    .filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.includes(q)) ||
        t.category.includes(q)
    )
    .sort((a, b) => b.popularity - a.popularity);
}

export function getTrendById(id: string): Trend | undefined {
  return getAllTrends().find((t) => t.id === id);
}

export function getTrendsByCategory(category: Trend["category"]): Trend[] {
  return getAllTrends()
    .filter((t) => t.category === category)
    .sort((a, b) => b.popularity - a.popularity);
}

export function getTopTrends(limit: number = 10): Trend[] {
  return getAllTrends()
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function getTrendStats(): { total: number; builtin: number; custom: number; categories: Record<string, number> } {
  const all = getAllTrends();
  const categories: Record<string, number> = {};
  for (const t of all) {
    categories[t.category] = (categories[t.category] || 0) + 1;
  }
  return {
    total: all.length,
    builtin: BUILTIN_TRENDS.length,
    custom: loadCustomTrends().length,
    categories,
  };
}
