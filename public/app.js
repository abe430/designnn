// ============================================
// DESIGNNN Web UI v0.4.0 — Client Application
// i18n-enabled (EN / JA auto-detect + toggle)
// ============================================

(function () {
  "use strict";

  // --- State ---
  let trends = [];
  let currentFilter = "all";
  let searchQuery = "";

  // --- i18n Init ---
  currentLang = detectLanguage();
  setLanguage(currentLang);

  // --- DOM References ---
  const navBtns = document.querySelectorAll(".nav-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const chatInput = document.getElementById("chat-input");
  const chatSubmit = document.getElementById("chat-submit");
  const chatResult = document.getElementById("chat-result");
  const quickPromptsContainer = document.getElementById("quick-prompts");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const trendsGrid = document.getElementById("trends-grid");
  const exploreResult = document.getElementById("explore-result");
  const exploreSearch = document.getElementById("explore-search");
  const trendsCountLabel = document.getElementById("trends-count-label");
  const mixSelect1 = document.getElementById("mix-select-1");
  const mixSelect2 = document.getElementById("mix-select-2");
  const mixContext = document.getElementById("mix-context");
  const mixSubmit = document.getElementById("mix-submit");
  const mixResult = document.getElementById("mix-result");
  const statsContainer = document.getElementById("stats-container");
  const langToggle = document.getElementById("lang-toggle");
  const langLabel = document.getElementById("lang-label");

  // ============================================
  // i18n — Apply translations to DOM
  // ============================================
  function applyI18n() {
    // Update lang label
    langLabel.textContent = currentLang.toUpperCase();
    document.documentElement.lang = currentLang === "ja" ? "ja" : "en";

    // Set font family for Japanese
    if (currentLang === "ja") {
      document.body.style.fontFamily = "'Noto Sans JP', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
    } else {
      document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
    }

    // data-i18n: text content
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    // data-i18n-html: innerHTML (for spans with highlights)
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const trendCount = trends.length || "65+";
      el.innerHTML = t(key, { count: trendCount });
    });

    // data-i18n-placeholder: input placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.placeholder = t(key);
    });

    // Quick prompts
    renderQuickPrompts();

    // Footer
    const footerText = document.getElementById("footer-text");
    if (footerText) {
      footerText.textContent = t("footerText", { version: "0.4.0" });
    }

    // Re-render dynamic content
    if (trends.length > 0) {
      renderTrends(getFilteredTrends());
      populateMixSelects(trends);
    }
  }

  function renderQuickPrompts() {
    const prompts = t("chatQuickPrompts");
    if (!Array.isArray(prompts)) return;

    // Keep the label, remove old buttons
    const label = quickPromptsContainer.querySelector(".quick-label");
    quickPromptsContainer.innerHTML = "";
    if (label) quickPromptsContainer.appendChild(label);

    prompts.forEach((p) => {
      const btn = document.createElement("button");
      btn.className = "quick-btn";
      btn.dataset.prompt = p.prompt;
      btn.textContent = p.label;
      btn.addEventListener("click", () => {
        chatInput.value = p.prompt;
        handleChat(p.prompt);
      });
      quickPromptsContainer.appendChild(btn);
    });
  }

  // Language toggle
  langToggle.addEventListener("click", () => {
    const newLang = currentLang === "en" ? "ja" : "en";
    currentLang = newLang;
    setLanguage(newLang);
    applyI18n();
  });

  // --- Tab Navigation ---
  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      navBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`tab-${tab}`).classList.add("active");
      if (tab === "stats") loadStats();
    });
  });

  // ============================================
  // Utility Functions
  // ============================================
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function showLoading(container) {
    container.classList.remove("hidden");
    container.innerHTML = `
      <div class="loading-indicator">
        <div class="loading-spinner"></div>
        <span>${t("chatLoading")}</span>
      </div>
    `;
  }

  function showResult(container, prompt, label) {
    container.classList.remove("hidden");
    const wordCount = prompt.split(/\s+/).length;
    container.innerHTML = `
      <div class="result-header">
        <div class="result-title">${label || t("resultGenerated")}</div>
        <button class="btn-copy" onclick="copyPrompt(this)">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          ${t("resultCopy")}
        </button>
      </div>
      <div class="result-body">
        <pre>${escapeHtml(prompt)}</pre>
      </div>
      <div class="result-footer">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        ${t("resultPasteHint")} &middot; ${wordCount} ${t("resultWords")}
      </div>
    `;
  }

  function showError(container, message) {
    container.classList.remove("hidden");
    container.innerHTML = `
      <div class="error-message">${escapeHtml(message)}</div>
    `;
  }

  // --- Copy to Clipboard ---
  window.copyPrompt = function (btn) {
    const pre = btn.closest(".result-area").querySelector("pre");
    if (!pre) return;
    navigator.clipboard.writeText(pre.textContent).then(() => {
      btn.classList.add("copied");
      btn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
        ${t("resultCopied")}
      `;
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          ${t("resultCopy")}
        `;
      }, 2000);
    });
  };

  // ============================================
  // CHAT
  // ============================================
  async function handleChat(message) {
    if (!message.trim()) return;
    chatSubmit.disabled = true;
    chatSubmit.innerHTML = `<div class="loading-spinner" style="width:16px;height:16px;border-width:2px"></div> ${t("chatGenerating")}`;
    showLoading(chatResult);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("errorFailed"));
      showResult(chatResult, data.prompt, t("resultPromptFor", { message }));
    } catch (err) {
      showError(chatResult, err.message);
    } finally {
      chatSubmit.disabled = false;
      chatSubmit.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg> <span data-i18n="chatGenerate">${t("chatGenerate")}</span>`;
    }
  }

  chatSubmit.addEventListener("click", () => handleChat(chatInput.value));
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleChat(chatInput.value);
  });

  // ============================================
  // EXPLORE
  // ============================================
  function getTrendDescription(trend) {
    if (currentLang === "ja" && window.TREND_DESC_JA && window.TREND_DESC_JA[trend.id]) {
      return window.TREND_DESC_JA[trend.id];
    }
    return trend.description;
  }

  function getCategoryLabel(category) {
    if (currentLang === "ja" && window.CATEGORY_JA && window.CATEGORY_JA[category]) {
      return window.CATEGORY_JA[category];
    }
    return category;
  }

  async function loadTrends() {
    try {
      const res = await fetch("/api/trends");
      const data = await res.json();
      trends = data.trends;
      renderTrends(trends);
      populateMixSelects(trends);
      // Apply i18n after trends loaded
      applyI18n();
    } catch (err) {
      trendsGrid.innerHTML = `<div class="error-message">${t("errorLoadTrends")}</div>`;
    }
  }

  function getFilteredTrends() {
    let filtered = trends;
    if (currentFilter !== "all") {
      filtered = filtered.filter((t) => t.category === currentFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.toLowerCase().includes(q)) ||
          (currentLang === "ja" && window.TREND_DESC_JA && window.TREND_DESC_JA[t.id] && window.TREND_DESC_JA[t.id].includes(q))
      );
    }
    return filtered;
  }

  function renderTrends(list) {
    trendsCountLabel.textContent = t("exploreShowing", { shown: list.length, total: trends.length });

    if (list.length === 0) {
      trendsGrid.innerHTML = `<div class="error-message" style="grid-column:1/-1;text-align:center">${t("exploreNoResults")}</div>`;
      return;
    }

    trendsGrid.innerHTML = list
      .map(
        (trend) => `
      <div class="trend-card" data-id="${trend.id}">
        <div class="trend-card-header">
          <span class="trend-name">${escapeHtml(trend.name)}</span>
          <span>
            <span class="trend-category">${getCategoryLabel(trend.category)}</span>
            ${trend.source === "ai-generated" ? '<span class="trend-source">AI</span>' : ""}
          </span>
        </div>
        <div class="trend-desc">${escapeHtml(getTrendDescription(trend))}</div>
        <div class="trend-meta">
          <div class="trend-popularity">
            <div class="popularity-bar">
              <div class="popularity-fill" style="width: ${trend.popularity}%"></div>
            </div>
            <span class="popularity-value">${trend.popularity}</span>
          </div>
        </div>
        <div class="trend-keywords">
          ${trend.keywords.slice(0, 4).map((k) => `<span class="keyword-tag">${escapeHtml(k)}</span>`).join("")}
        </div>
        <div class="trend-card-action">
          <button class="btn-generate" onclick="generateFromTrend('${trend.id}')">${t("exploreGenerateBtn")}</button>
        </div>
      </div>
    `
      )
      .join("");
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.category;
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderTrends(getFilteredTrends());
      exploreResult.classList.add("hidden");
    });
  });

  if (exploreSearch) {
    exploreSearch.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderTrends(getFilteredTrends());
    });
  }

  window.generateFromTrend = async function (trendId) {
    showLoading(exploreResult);
    exploreResult.scrollIntoView({ behavior: "smooth", block: "nearest" });

    try {
      const res = await fetch("/api/explore/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trendId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("errorFailed"));
      showResult(exploreResult, data.prompt, t("resultTrend", { name: data.trend.name }));
    } catch (err) {
      showError(exploreResult, err.message);
    }
  };

  // ============================================
  // MIX
  // ============================================
  function populateMixSelects(list) {
    const grouped = {};
    list.forEach((t) => {
      if (!grouped[t.category]) grouped[t.category] = [];
      grouped[t.category].push(t);
    });

    const optionsHtml = Object.entries(grouped)
      .map(
        ([cat, items]) =>
          `<optgroup label="${getCategoryLabel(cat)}">` +
          items.map((t) => `<option value="${t.id}">${t.name}</option>`).join("") +
          `</optgroup>`
      )
      .join("");

    const placeholder = `<option value="">${t("mixSelectPlaceholder")}</option>`;
    mixSelect1.innerHTML = placeholder + optionsHtml;
    mixSelect2.innerHTML = placeholder + optionsHtml;
  }

  async function handleMix() {
    const t1 = mixSelect1.value;
    const t2 = mixSelect2.value;
    const ctx = mixContext.value;

    if (!t1 || !t2) {
      showError(mixResult, t("mixErrorSelect"));
      return;
    }
    if (t1 === t2) {
      showError(mixResult, t("mixErrorSame"));
      return;
    }

    mixSubmit.disabled = true;
    mixSubmit.innerHTML = `<div class="loading-spinner" style="width:16px;height:16px;border-width:2px"></div> ${t("mixMixing")}`;
    showLoading(mixResult);

    try {
      const res = await fetch("/api/mix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trend1Id: t1, trend2Id: t2, context: ctx }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("errorFailed"));
      showResult(
        mixResult,
        data.prompt,
        t("resultMix", { name1: data.trend1.name, name2: data.trend2.name })
      );
    } catch (err) {
      showError(mixResult, err.message);
    } finally {
      mixSubmit.disabled = false;
      mixSubmit.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg> <span data-i18n="mixGenerate">${t("mixGenerate")}</span>`;
    }
  }

  mixSubmit.addEventListener("click", handleMix);

  // ============================================
  // STATS
  // ============================================
  async function loadStats() {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      renderStats(data);
    } catch (err) {
      statsContainer.innerHTML = `<div class="error-message">${t("errorLoadStats")}</div>`;
    }
  }

  function renderStats(data) {
    const maxCat = Math.max(...Object.values(data.categories));

    const categoryBars = Object.entries(data.categories)
      .sort((a, b) => b[1] - a[1])
      .map(
        ([cat, count]) => `
        <div class="stat-bar-row">
          <span class="stat-bar-label">${getCategoryLabel(cat)}</span>
          <div class="stat-bar-track">
            <div class="stat-bar-fill" style="width: ${(count / maxCat) * 100}%"></div>
          </div>
          <span class="stat-bar-count">${count}</span>
        </div>
      `
      )
      .join("");

    statsContainer.innerHTML = `
      <div class="stat-card accent">
        <div class="stat-value">${data.total}</div>
        <div class="stat-label">${t("statsTotalTrends")}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${data.builtin}</div>
        <div class="stat-label">${t("statsBuiltin")}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${data.custom}</div>
        <div class="stat-label">${t("statsAiGenerated")}</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Object.keys(data.categories).length}</div>
        <div class="stat-label">${t("statsCategories")}</div>
      </div>
      <div class="stat-bar-container">
        <div class="stat-bar-title">${t("statsByCategory")}</div>
        ${categoryBars}
      </div>
    `;
  }

  // --- Init ---
  loadTrends();

  // Keyboard shortcut: / to focus search
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      chatInput.focus();
    }
  });
})();
