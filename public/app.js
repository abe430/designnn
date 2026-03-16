// ============================================
// DESIGNNN Web UI — Client Application
// ============================================

(function () {
  "use strict";

  // --- State ---
  let trends = [];
  let currentFilter = "all";

  // --- DOM References ---
  const navBtns = document.querySelectorAll(".nav-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const chatInput = document.getElementById("chat-input");
  const chatSubmit = document.getElementById("chat-submit");
  const chatResult = document.getElementById("chat-result");
  const quickBtns = document.querySelectorAll(".quick-btn");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const trendsGrid = document.getElementById("trends-grid");
  const exploreResult = document.getElementById("explore-result");
  const mixSelect1 = document.getElementById("mix-select-1");
  const mixSelect2 = document.getElementById("mix-select-2");
  const mixContext = document.getElementById("mix-context");
  const mixSubmit = document.getElementById("mix-submit");
  const mixResult = document.getElementById("mix-result");

  // --- Tab Navigation ---
  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      navBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`tab-${tab}`).classList.add("active");
    });
  });

  // --- Utility: Show Loading ---
  function showLoading(container) {
    container.classList.remove("hidden");
    container.innerHTML = `
      <div class="loading-indicator">
        <div class="loading-dots">
          <span></span><span></span><span></span>
        </div>
        <span>Generating prompt...</span>
      </div>
    `;
  }

  // --- Utility: Show Result ---
  function showResult(container, prompt, label) {
    container.classList.remove("hidden");
    container.innerHTML = `
      <div class="result-header">
        <div class="result-title">${label || "Generated Prompt"}</div>
        <button class="btn-copy" onclick="copyPrompt(this)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          Copy
        </button>
      </div>
      <div class="result-body">
        <pre>${escapeHtml(prompt)}</pre>
      </div>
      <div class="result-footer">
        Paste this prompt into Figma AI (Ctrl+I / Cmd+I)
      </div>
    `;
  }

  // --- Utility: Show Error ---
  function showError(container, message) {
    container.classList.remove("hidden");
    container.innerHTML = `
      <div class="error-message">${escapeHtml(message)}</div>
    `;
  }

  // --- Utility: Escape HTML ---
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // --- Copy to Clipboard ---
  window.copyPrompt = function (btn) {
    const pre = btn.closest(".result-area").querySelector("pre");
    if (!pre) return;
    navigator.clipboard.writeText(pre.textContent).then(() => {
      btn.classList.add("copied");
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
        Copied!
      `;
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          Copy
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
    chatSubmit.textContent = "Generating...";
    showLoading(chatResult);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      showResult(chatResult, data.prompt, `Prompt for: "${message}"`);
    } catch (err) {
      showError(chatResult, err.message);
    } finally {
      chatSubmit.disabled = false;
      chatSubmit.textContent = "Generate";
    }
  }

  chatSubmit.addEventListener("click", () => handleChat(chatInput.value));
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleChat(chatInput.value);
  });

  quickBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      chatInput.value = btn.dataset.prompt;
      handleChat(btn.dataset.prompt);
    });
  });

  // ============================================
  // EXPLORE
  // ============================================
  async function loadTrends() {
    try {
      const res = await fetch("/api/trends");
      const data = await res.json();
      trends = data.trends;
      renderTrends(trends);
      populateMixSelects(trends);
    } catch (err) {
      trendsGrid.innerHTML = `<div class="error-message">Failed to load trends</div>`;
    }
  }

  function renderTrends(list) {
    trendsGrid.innerHTML = list
      .map(
        (t) => `
      <div class="trend-card" data-id="${t.id}">
        <div class="trend-card-header">
          <span class="trend-name">${escapeHtml(t.name)}</span>
          <span class="trend-category">${t.category}</span>
        </div>
        <div class="trend-desc">${escapeHtml(t.description)}</div>
        <div class="trend-popularity">
          <div class="popularity-bar">
            <div class="popularity-fill" style="width: ${t.popularity}%"></div>
          </div>
          <span class="popularity-value">${t.popularity}%</span>
        </div>
        <div class="trend-keywords">
          ${t.keywords.map((k) => `<span class="keyword-tag">${escapeHtml(k)}</span>`).join("")}
        </div>
        <div class="trend-card-action">
          <button class="btn-generate" onclick="generateFromTrend('${t.id}')">Generate Prompt</button>
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

      if (currentFilter === "all") {
        renderTrends(trends);
      } else {
        renderTrends(trends.filter((t) => t.category === currentFilter));
      }
      exploreResult.classList.add("hidden");
    });
  });

  window.generateFromTrend = async function (trendId) {
    showLoading(exploreResult);
    // Scroll to result
    exploreResult.scrollIntoView({ behavior: "smooth", block: "nearest" });

    try {
      const res = await fetch("/api/explore/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trendId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      showResult(exploreResult, data.prompt, `Trend: ${data.trend.name}`);
    } catch (err) {
      showError(exploreResult, err.message);
    }
  };

  // ============================================
  // MIX
  // ============================================
  function populateMixSelects(list) {
    const options = list
      .map((t) => `<option value="${t.id}">${t.name} [${t.category}]</option>`)
      .join("");
    const placeholder = `<option value="">Select a trend...</option>`;
    mixSelect1.innerHTML = placeholder + options;
    mixSelect2.innerHTML = placeholder + options;
  }

  async function handleMix() {
    const t1 = mixSelect1.value;
    const t2 = mixSelect2.value;
    const ctx = mixContext.value;

    if (!t1 || !t2) {
      showError(mixResult, "Please select two trends to mix.");
      return;
    }
    if (t1 === t2) {
      showError(mixResult, "Please select two different trends.");
      return;
    }

    mixSubmit.disabled = true;
    mixSubmit.textContent = "Mixing...";
    showLoading(mixResult);

    try {
      const res = await fetch("/api/mix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trend1Id: t1, trend2Id: t2, context: ctx || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to mix");
      showResult(
        mixResult,
        data.prompt,
        `Mix: ${data.trend1.name} × ${data.trend2.name}`
      );
    } catch (err) {
      showError(mixResult, err.message);
    } finally {
      mixSubmit.disabled = false;
      mixSubmit.textContent = "Mix & Generate";
    }
  }

  mixSubmit.addEventListener("click", handleMix);

  // --- Init ---
  loadTrends();
})();
