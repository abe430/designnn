import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  getAllTrends,
  searchTrends,
  getTrendById,
  getTrendsByCategory,
  getTopTrends,
  getTrendStats,
} from "../data/trends.js";
import {
  generateChatPrompt,
  generateTrendPrompt,
  generateMixPrompt,
} from "../core/engine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createServer(port: number = 3333) {
  const app = express();

  app.use(express.json());

  // Serve static files from the public directory
  // Support both dev (src/web/) and bundled (dist/) paths
  const publicDir = path.join(__dirname, "../../public");
  const publicDirAlt = path.join(__dirname, "../public");
  const fs_check = await import("fs");
  const resolvedPublic = fs_check.existsSync(publicDir) ? publicDir : publicDirAlt;
  app.use(express.static(resolvedPublic));

  // === API Routes ===

  // GET /api/trends - List all trends with optional filters
  app.get("/api/trends", (req, res) => {
    const { category, search, top } = req.query;

    let results;

    if (category && typeof category === "string") {
      results = getTrendsByCategory(category as any);
    } else if (search && typeof search === "string") {
      results = searchTrends(search);
    } else if (top && typeof top === "string") {
      results = getTopTrends(parseInt(top, 10));
    } else {
      results = getTopTrends(200); // Get all, sorted by popularity
    }

    res.json({ trends: results, total: results.length });
  });

  // GET /api/trends/:id - Get a single trend
  app.get("/api/trends/:id", (req, res) => {
    const trend = getTrendById(req.params.id);
    if (!trend) {
      res.status(404).json({ error: "Trend not found" });
      return;
    }
    res.json({ trend });
  });

  // GET /api/categories - List all categories
  app.get("/api/categories", (_req, res) => {
    const categories = [...new Set(getAllTrends().map((t) => t.category))];
    res.json({ categories });
  });

  // GET /api/stats - Get trend database statistics
  app.get("/api/stats", (_req, res) => {
    const stats = getTrendStats();
    res.json(stats);
  });

  // POST /api/chat - Generate prompt from natural language
  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "message is required" });
      return;
    }

    try {
      const prompt = await generateChatPrompt(message);
      res.json({ prompt, input: message });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to generate prompt" });
    }
  });

  // POST /api/explore/generate - Generate prompt from a trend
  app.post("/api/explore/generate", async (req, res) => {
    const { trendId } = req.body;
    if (!trendId || typeof trendId !== "string") {
      res.status(400).json({ error: "trendId is required" });
      return;
    }

    const trend = getTrendById(trendId);
    if (!trend) {
      res.status(404).json({ error: "Trend not found" });
      return;
    }

    try {
      const prompt = await generateTrendPrompt(trend);
      res.json({ prompt, trend });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to generate prompt" });
    }
  });

  // POST /api/mix - Mix two trends
  app.post("/api/mix", async (req, res) => {
    const { trend1Id, trend2Id, context } = req.body;
    if (!trend1Id || !trend2Id) {
      res.status(400).json({ error: "trend1Id and trend2Id are required" });
      return;
    }

    const trend1 = getTrendById(trend1Id);
    const trend2 = getTrendById(trend2Id);

    if (!trend1) {
      res.status(404).json({ error: `Trend not found: ${trend1Id}` });
      return;
    }
    if (!trend2) {
      res.status(404).json({ error: `Trend not found: ${trend2Id}` });
      return;
    }

    try {
      const prompt = await generateMixPrompt(trend1, trend2, context);
      res.json({ prompt, trend1, trend2, context });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to generate prompt" });
    }
  });

  // Fallback: serve index.html for SPA
  app.get("/{*splat}", (_req, res) => {
    res.sendFile(path.join(resolvedPublic, "index.html"));
  });

  return app;
}

export async function startWebServer(port: number = 3333): Promise<void> {
  const app = await createServer(port);
  app.listen(port, () => {
    const stats = getTrendStats();
    console.log("");
    console.log(`  \x1b[1m\x1b[38;2;204;255;0mDESIGNNN\x1b[0m \x1b[90mWeb UI\x1b[0m`);
    console.log(`  \x1b[90m────────────────────────────────\x1b[0m`);
    console.log(`  \x1b[90mLocal:\x1b[0m   \x1b[36mhttp://localhost:${port}\x1b[0m`);
    console.log(`  \x1b[90mTrends:\x1b[0m  \x1b[38;2;204;255;0m${stats.total}\x1b[0m \x1b[90m(${stats.builtin} built-in, ${stats.custom} custom)\x1b[0m`);
    console.log(`  \x1b[90m────────────────────────────────\x1b[0m`);
    console.log(`  \x1b[90mPress Ctrl+C to stop\x1b[0m`);
    console.log("");
  });
}
