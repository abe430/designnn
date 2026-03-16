<div align="center">

# DESIGNNN

**Trend-driven design prompt engine for Figma AI**

Generate high-quality UI/UX design prompts powered by real-time design trend analysis.

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/designnn.svg)](https://www.npmjs.com/package/designnn)

</div>

---

## The Problem

AI design tools like **Figma AI** can generate stunning UI designs — but only if you give them the right prompt. Most designers struggle with:

- **"What should I prompt?"** — Knowing current design trends is hard to keep up with
- **"How do I describe this style?"** — Translating visual ideas into precise text prompts
- **"How do I combine trends?"** — Mixing multiple design styles into something fresh

## The Solution

**DESIGNNN** is a CLI tool and MCP server that acts as a **design intelligence layer** for Figma AI. It knows the latest UI/UX design trends and generates optimized prompts that Figma AI can directly use.

```
$ designnn chat "SaaS pricing page with dark theme"

  ─── Prompt for: "SaaS pricing page with dark theme" ───

  Design a SaaS pricing page with a modern dark theme...
  Use a full-width frame sized 1440px wide...
  Each grid cell is a pricing card with subtle rounded corners (12px)...

  📋 Copy the prompt above and paste it into Figma AI (Ctrl+I)
```

## Quick Start

### Installation

```bash
# Install globally via npm
npm install -g designnn

# Or run directly with npx
npx designnn chat "landing page for a fitness app"
```

### Set your OpenAI API key

```bash
export OPENAI_API_KEY=your-api-key-here
```

### Usage

#### 1. Chat to Prompt

Generate a Figma AI prompt from any design description:

```bash
designnn chat "SaaS dashboard with analytics charts and dark theme"
designnn chat "Mobile onboarding flow for a meditation app"
designnn chat "E-commerce product page with glassmorphism style"
```

#### 2. Explore Trends

Browse the built-in design trend database:

```bash
# Show top 10 trends
designnn explore --top 10

# Filter by category
designnn explore --category style
designnn explore --category component
designnn explore --category pattern

# Search by keyword
designnn explore --component "bento"

# Generate a prompt from a specific trend
designnn explore --generate bento-ui
```

#### 3. Mix Trends

Combine two design trends into something new:

```bash
designnn mix "Bento UI" "Glassmorphism"
designnn mix "neubrutalism" "dark-mode-first" --context "for a music streaming app"
designnn mix "kinetic-typography" "organic-shapes" --context "landing page for a creative agency"
```

#### 4. MCP Server (AI Agent Integration)

Start DESIGNNN as an MCP server for integration with AI agents like Claude Code, Codex, or OpenCode:

```bash
designnn agent
```

**MCP Configuration** (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "designnn": {
      "command": "npx",
      "args": ["-y", "designnn", "agent"]
    }
  }
}
```

**Available MCP Tools:**

| Tool | Description |
|---|---|
| `generate_prompt` | Generate a Figma AI prompt from natural language |
| `explore_trends` | Search and browse design trends |
| `generate_trend_prompt` | Generate a prompt based on a specific trend |
| `mix_trends` | Mix two trends into a creative prompt |

## Design Trends Database

DESIGNNN includes a curated database of 18+ current UI/UX design trends:

| Category | Trends |
|---|---|
| **Style** | Bento UI, Glassmorphism, Neubrutalism, Organic Shapes, Dark Mode First, Kinetic Typography |
| **Component** | Floating Action Bar, Skeleton Loading, Command Palette |
| **Pattern** | SaaS Pricing, Progressive Onboarding, Analytics Dashboard, Minimal Auth |
| **Layout** | Split Hero, Collapsible Sidebar, Mobile Bottom Sheet, Responsive Card Grid |
| **Interaction** | Micro-interactions |

## How It Works

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌───────────┐
│  User Input  │ ──▶ │  Trend DB    │ ──▶ │  LLM Engine  │ ──▶ │  Figma AI │
│  (CLI/MCP)   │     │  (18+ trends)│     │  (GPT-4.1)   │     │  Prompt   │
└─────────────┘     └──────────────┘     └──────────────┘     └───────────┘
```

1. **Input**: Describe what you want to design (CLI or MCP)
2. **Trend Analysis**: DESIGNNN matches your request with current design trends
3. **Prompt Generation**: GPT-4.1 generates a detailed, Figma AI-optimized prompt
4. **Output**: Copy the prompt and paste it into Figma AI (Ctrl+I / Cmd+I)

## Configuration

```bash
# Set API key via environment variable
export OPENAI_API_KEY=your-key

# Or use a custom OpenAI-compatible endpoint
export OPENAI_BASE_URL=https://your-endpoint.com/v1
```

## Tech Stack

- **Runtime**: [Bun](https://bun.sh) / Node.js
- **Language**: TypeScript
- **CLI Framework**: [Commander.js](https://github.com/tj/commander.js)
- **AI Engine**: OpenAI GPT-4.1
- **MCP**: [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)
- **License**: MIT

## Contributing

Contributions are welcome! Here are some ways you can help:

- **Add new trends**: Submit PRs to expand the trend database
- **Improve prompts**: Help refine the prompt generation quality
- **Build integrations**: Create plugins for other design tools
- **Report bugs**: Open issues for any problems you find

## Roadmap

- [x] CLI core (chat, explore, mix)
- [x] MCP server integration
- [ ] Web UI (`designnn serve`)
- [ ] Live trend data from Dribbble, Awwwards, Behance
- [ ] Figma plugin for direct integration
- [ ] Multi-language prompt support
- [ ] Community trend submissions

## License

[MIT](LICENSE) - Made with energy by [concepter](https://github.com/concepter)
