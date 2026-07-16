/* ================= IT発掘スロット ================= */
"use strict";

/* ---------- 50種類のITツール（IT_tool_Creatteカタログ準拠・全て異なる） ---------- */
const CATS = {
  "AI":                 { label: "AI",                 color: "#8b5cf6" },
  "コミュニケーション": { label: "コミュニケーション", color: "#ec4899" },
  "ビデオ会議":         { label: "ビデオ会議",         color: "#2d8cff" },
  "生産性スイート":     { label: "生産性スイート",     color: "#0ea5b7" },
  "ドキュメント管理":   { label: "ドキュメント管理",   color: "#6366f1" },
  "プロジェクト管理":   { label: "プロジェクト管理",   color: "#ef4444" },
  "CRM・営業":          { label: "CRM・営業",          color: "#f59e0b" },
  "自動化・RPA":        { label: "自動化・RPA",        color: "#f97316" },
  "ローコード・DB":     { label: "ローコード・DB",     color: "#22a55e" },
  "経理・HR":           { label: "経理・HR",           color: "#84cc16" },
  "デザイン":           { label: "デザイン",           color: "#d946ef" },
  "会議・録画":         { label: "会議・録画",         color: "#14b8a6" },
  "スケジュール":       { label: "スケジュール",       color: "#eab308" },
  "決済":               { label: "決済",               color: "#635bff" },
};

const IMG_DIR = "assets/img/";
const DETAIL_BASE = "https://ittool.creatte.jp/"; // カタログサイト（結果カードのリンク先）

const TOOLS = [
  // AI (6) — 激レア演出の当たり枠
  { id: "chatgpt",       name: "ChatGPT",                 icon: "🤖", cat: "AI",                 img: "01_chatgpt.png",           desc: "OpenAIの高性能AIチャット" },
  { id: "claude",        name: "Claude",                  icon: "🌿", cat: "AI",                 img: "02_claude.png",            desc: "Anthropicの安全性重視AI" },
  { id: "gemini",        name: "Gemini",                  icon: "♊", cat: "AI",                 img: "03_gemini.png",            desc: "GoogleのマルチモーダルAI" },
  { id: "notebooklm",    name: "NotebookLM",              icon: "📓", cat: "AI",                 img: "04_notebooklm.png",        desc: "Googleのドキュメント特化AI" },
  { id: "perplexity",    name: "Perplexity",              icon: "🔎", cat: "AI",                 img: "05_perplexity.png",        desc: "AI搭載のリアルタイム検索エンジン" },
  { id: "copilot",       name: "Microsoft Copilot",       icon: "🪁", cat: "AI",                 img: "06_microsoft_copilot.png", desc: "Microsoft 365に統合されたAI" },
  // コミュニケーション (4)
  { id: "slack",         name: "Slack",                   icon: "💬", cat: "コミュニケーション", img: "07_slack.png",             desc: "チームのハブとなるビジネスチャット" },
  { id: "teams",         name: "Microsoft Teams",         icon: "🟦", cat: "コミュニケーション", img: "08_microsoft_teams.png",   desc: "Microsoft 365統合のコラボ基盤" },
  { id: "chatwork",      name: "Chatwork",                icon: "💭", cat: "コミュニケーション", img: "09_chatwork.png",          desc: "国内シェアNo.1のビジネスチャット" },
  { id: "lineworks",     name: "LINE WORKS",              icon: "💚", cat: "コミュニケーション", img: "10_line_works.png",        desc: "LINEライクなビジネス版チャット" },
  // ビデオ会議 (2)
  { id: "zoom",          name: "Zoom",                    icon: "📹", cat: "ビデオ会議",         img: "11_zoom.png",              desc: "世界標準のオンライン会議ツール" },
  { id: "meet",          name: "Google Meet",             icon: "📺", cat: "ビデオ会議",         img: "12_google_meet.png",       desc: "Google Workspace統合のビデオ通話" },
  // 生産性スイート (2)
  { id: "gws",           name: "Google Workspace",        icon: "🌐", cat: "生産性スイート",     img: "13_google_workspace.png",  desc: "Google製クラウドビジネスツール群" },
  { id: "m365",          name: "Microsoft 365",           icon: "🪟", cat: "生産性スイート",     img: "14_microsoft_365.png",     desc: "Word・Excel・PowerPointのクラウド版" },
  // ドキュメント管理 (4)
  { id: "notion",        name: "Notion",                  icon: "📄", cat: "ドキュメント管理",   img: "15_notion.png",            desc: "メモ・Wiki・DB・プロジェクトを一元化" },
  { id: "dropbox",       name: "Dropbox",                 icon: "📦", cat: "ドキュメント管理",   img: "16_dropbox.png",           desc: "シンプル・高速なクラウドストレージ" },
  { id: "box",           name: "Box",                     icon: "📫", cat: "ドキュメント管理",   img: "17_box.png",               desc: "エンタープライズ向けセキュアクラウドストレージ" },
  { id: "confluence",    name: "Confluence",              icon: "📚", cat: "ドキュメント管理",   img: "18_confluence.png",        desc: "Atlassianのチームwikiプラットフォーム" },
  // プロジェクト管理 (6)
  { id: "asana",         name: "Asana",                   icon: "🎯", cat: "プロジェクト管理",   img: "19_asana.png",             desc: "タスク・プロジェクトを可視化するPM" },
  { id: "trello",        name: "Trello",                  icon: "🗂", cat: "プロジェクト管理",   img: "20_trello.png",            desc: "カンバンボードで直感管理" },
  { id: "backlog",       name: "Backlog",                 icon: "📋", cat: "プロジェクト管理",   img: "21_backlog.png",           desc: "国産の開発・プロジェクト管理ツール" },
  { id: "jira",          name: "Jira",                    icon: "📌", cat: "プロジェクト管理",   img: "22_jira.png",              desc: "アジャイル開発の定番ツール" },
  { id: "monday",        name: "monday.com",              icon: "📅", cat: "プロジェクト管理",   img: "23_monday.png",            desc: "視覚的で柔軟なワークOSプラットフォーム" },
  { id: "clickup",       name: "ClickUp",                 icon: "🚀", cat: "プロジェクト管理",   img: "24_clickup.png",           desc: "タスク管理の究極オールインワン" },
  // CRM・営業 (5)
  { id: "salesforce",    name: "Salesforce",              icon: "☁", cat: "CRM・営業",          img: "25_salesforce.png",        desc: "世界シェアNo.1のCRM/SFAプラットフォーム" },
  { id: "hubspot",       name: "HubSpot",                 icon: "🧲", cat: "CRM・営業",          img: "26_hubspot.png",           desc: "無料から始められるCRM・MA統合ツール" },
  { id: "linebiz",       name: "公式LINE",                icon: "🟩", cat: "CRM・営業",          img: "27_official_line.png",     desc: "9,500万ユーザーへの直接リーチ" },
  { id: "mailchimp",     name: "Mailchimp",               icon: "📧", cat: "CRM・営業",          img: "28_mailchimp.png",         desc: "世界最大のメールマーケティングツール" },
  { id: "sansan",        name: "Sansan",                  icon: "💼", cat: "CRM・営業",          img: "29_sansan.png",            desc: "名刺管理DXのリーディングカンパニー" },
  // 自動化・RPA (4)
  { id: "zapier",        name: "Zapier",                  icon: "⚡", cat: "自動化・RPA",        img: "30_zapier.png",            desc: "7,000以上のアプリをノーコードで連携" },
  { id: "make",          name: "Make",                    icon: "🔧", cat: "自動化・RPA",        img: "31_make.png",              desc: "視覚的なワークフロー自動化ツール" },
  { id: "powerautomate", name: "Power Automate",          icon: "🌊", cat: "自動化・RPA",        img: "32_power_automate.png",    desc: "Microsoft製のRPA・フロー自動化" },
  { id: "uipath",        name: "UiPath",                  icon: "🦾", cat: "自動化・RPA",        img: "33_uipath.png",            desc: "エンタープライズ向けRPAプラットフォーム" },
  // ローコード・DB (2)
  { id: "kintone",       name: "kintone",                 icon: "⚙", cat: "ローコード・DB",     img: "34_kintone.png",           desc: "サイボウズのノーコード業務アプリ作成" },
  { id: "airtable",      name: "Airtable",                icon: "📊", cat: "ローコード・DB",     img: "35_airtable.png",          desc: "スプレッドシート×データベースの融合" },
  // 経理・HR (5)
  { id: "freee",         name: "freee",                   icon: "💰", cat: "経理・HR",           img: "36_freee.png",             desc: "中小企業向けクラウド会計・HR" },
  { id: "mfcloud",       name: "マネーフォワード クラウド", icon: "💎", cat: "経理・HR",           img: "37_moneyforward.png",      desc: "上場企業から中小まで対応の経理DX" },
  { id: "smarthr",       name: "SmartHR",                 icon: "👥", cat: "経理・HR",           img: "38_smarthr.png",           desc: "労務・人事管理のクラウドNo.1" },
  { id: "jobcan",        name: "ジョブカン",              icon: "⏱", cat: "経理・HR",           img: "39_jobcan.png",            desc: "勤怠・給与・経費を一元管理" },
  { id: "rakuraku",      name: "楽楽精算",                icon: "🧾", cat: "経理・HR",           img: "40_rakuraku_seisan.png",   desc: "経費精算に特化したクラウドサービス" },
  // デザイン (4)
  { id: "canva",         name: "Canva",                   icon: "🎨", cat: "デザイン",           img: "41_canva.png",             desc: "ノンデザイナーが使える高品質デザインツール" },
  { id: "figma",         name: "Figma",                   icon: "🎭", cat: "デザイン",           img: "42_figma.png",             desc: "UIデザイン・プロトタイピングの世界標準" },
  { id: "adobeexpress",  name: "Adobe Express",           icon: "✨", cat: "デザイン",           img: "43_adobe_express.png",     desc: "Adobe製のかんたんデザインツール" },
  { id: "miro",          name: "Miro",                    icon: "💡", cat: "デザイン",           img: "44_miro.png",              desc: "オンラインホワイトボード・ブレスト" },
  // 会議・録画 (3)
  { id: "otter",         name: "Otter.ai",                icon: "🦦", cat: "会議・録画",         img: "45_otter_ai.png",          desc: "AIリアルタイム文字起こし&要約" },
  { id: "tldv",          name: "tl;dv",                   icon: "⏩", cat: "会議・録画",         img: "46_tldv.png",              desc: "会議録画+AIハイライト抽出" },
  { id: "loom",          name: "Loom",                    icon: "🎬", cat: "会議・録画",         img: "47_loom.png",              desc: "画面録画+非同期コミュニケーション" },
  // スケジュール (2)
  { id: "calendly",      name: "Calendly",                icon: "📆", cat: "スケジュール",       img: "48_calendly.png",          desc: "日程調整を完全自動化" },
  { id: "timerex",       name: "TimeRex",                 icon: "🗓", cat: "スケジュール",       img: "49_timerex.png",           desc: "日本企業向け日程調整ツール" },
  // 決済 (1)
  { id: "stripe",        name: "Stripe",                  icon: "💳", cat: "決済",               img: "50_stripe.png",            desc: "開発者フレンドリーな決済インフラ" },
];

/* ---------- 定数 ---------- */
const N = TOOLS.length; // 50
const ITEM_H = () =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--item-h"));
const LOOP = () => N * ITEM_H();

const CALLOUTS = ["ガコン!!", "ビタ止め!", "ズドン!!", "キュピーン!", "発掘ゥ!!", "おっと!?"];
const LAST_CALLOUTS = {
  slam:    "一撃ズドン!!",
  jirashi: "じらしからの…発掘!!",
  reverse: "まさかの逆回転!!",
  rainbow: "AI大発掘ィィィ!!",
};
const SYNERGY_COMMENTS = [
  "この3つでスタートアップが1社できます。",
  "月曜の朝に全部同時に開くと強そうな組み合わせ。",
  "履歴書に書いたら面接官がざわつくラインナップ。",
  "このチーム、ハッカソンで優勝する顔をしています。",
  "組み合わせた者だけが辿り着ける境地があります。",
  "エンジニアの夢が詰まった三種の神器です。",
];

/* ---------- DOM生成ヘルパー（innerHTML不使用） ---------- */
function elem(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

/* ツールのビジュアル（画像優先・読み込み失敗時は絵文字にフォールバック） */
function makeToolIcon(tool, cls) {
  if (tool.img) {
    const im = document.createElement("img");
    im.className = cls;
    im.src = IMG_DIR + tool.img;
    im.alt = tool.name;
    im.draggable = false;
    im.addEventListener("error", () => {
      im.replaceWith(elem("span", cls, tool.icon));
    }, { once: true });
    return im;
  }
  return elem("span", cls, tool.icon);
}

/* ---------- サウンド (Web Audio / 外部ファイル不要) ---------- */
let audioCtx = null;
let muted = false;
function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
}
function beep(freq, dur = 0.08, type = "square", gain = 0.06, when = 0) {
  if (muted || !audioCtx) return;
  const t = audioCtx.currentTime + when;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(audioCtx.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}
const sndStart = () => { beep(440, .07); beep(660, .07, "square", .06, .08); beep(880, .1, "square", .06, .16); };
const sndStop  = () => { beep(120, .12, "square", .1); beep(90, .16, "triangle", .1, .02); };
const sndTick  = () => beep(1200, .02, "square", .02);
const sndFanfare = () => {
  [523, 659, 784, 1047, 784, 1047].forEach((f, i) => beep(f, .14, "triangle", .07, i * 0.11));
};
const sndCutin = () => {
  if (muted || !audioCtx) return;
  const t = audioCtx.currentTime;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(180, t);
  o.frequency.exponentialRampToValueAtTime(950, t + 0.35);
  g.gain.setValueAtTime(0.07, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
  o.connect(g).connect(audioCtx.destination);
  o.start(t);
  o.stop(t + 0.55);
};
const sndLever = () => { beep(300, .06, "square", .08); beep(180, .1, "square", .08, .07); };

/* ---------- 外部効果音（Kenney / CC0）。読み込み失敗時はシンセ音にフォールバック ---------- */
const SFX_NAMES = ["start", "lever", "stop1", "stop2", "stop3", "slam", "bell", "cutin", "coin", "coins2", "fanfare", "bigwin"];
const sfx = {};
for (const n of SFX_NAMES) {
  const a = new Audio(`assets/audio/${n}.ogg`);
  a.preload = "auto";
  a.addEventListener("error", () => { a.failed = true; });
  sfx[n] = a;
}
const SFX_FALLBACK = {
  start: sndStart, lever: sndLever,
  stop1: sndStop, stop2: sndStop, stop3: sndStop, slam: sndStop,
  cutin: sndCutin, fanfare: sndFanfare, bigwin: sndFanfare,
};
function playSfx(name, vol = 0.7) {
  if (muted) return;
  const base = sfx[name];
  if (!base || base.failed) {
    if (SFX_FALLBACK[name]) SFX_FALLBACK[name]();
    return;
  }
  const a = base.cloneNode();
  a.volume = vol;
  a.play().catch(() => {});
}

/* 回転中のウィーン音（ノイズ＋バンドパス、外部ファイル不要のループ） */
let whirNodes = null;
function startWhir() {
  if (!audioCtx || whirNodes) return;
  const len = audioCtx.sampleRate * 1.5;
  const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = audioCtx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const bp = audioCtx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 620;
  bp.Q.value = 2.5;
  const lfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  lfo.frequency.value = 11;
  lfoGain.gain.value = 180;
  lfo.connect(lfoGain).connect(bp.frequency);
  const g = audioCtx.createGain();
  g.gain.value = muted ? 0 : 0.035;
  src.connect(bp).connect(g).connect(audioCtx.destination);
  src.start();
  lfo.start();
  whirNodes = { src, lfo, g };
}
function stopWhir() {
  if (!whirNodes) return;
  try { whirNodes.src.stop(); whirNodes.lfo.stop(); } catch (e) { /* 停止済みなら無視 */ }
  whirNodes = null;
}

/* ---------- ユーティリティ ---------- */
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const mod = (v, m) => ((v % m) + m) % m;
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/* ---------- リール ---------- */
class Reel {
  constructor(el, index) {
    this.el = el;
    this.index = index;
    this.strip = el.querySelector(".strip");
    this.flashEl = el.querySelector(".flash");
    this.order = shuffle([...Array(N).keys()]); // リールごとに違う並び
    this.centerSlot = Math.floor(Math.random() * N); // 中央（ペイライン）に見せるコマ
    this.pos = mod((this.centerSlot - 1) * ITEM_H(), LOOP()); // コマ境界にスナップ
    this.speed = 0;     // px/ms
    this.mode = "idle"; // idle | accel | spin | stopping | stopped
    this.anim = null;
    this.resultTool = null;
    this.buildStrip();
    this.draw();
  }

  buildStrip() {
    const frag = document.createDocumentFragment();
    for (let rep = 0; rep < 2; rep++) {
      for (const ti of this.order) {
        const t = TOOLS[ti];
        const c = CATS[t.cat];
        const cell = elem("div", "cell");
        cell.appendChild(makeToolIcon(t, "icon"));
        cell.appendChild(elem("span", "name", t.name));
        const cat = elem("span", "cat", c.label);
        cat.style.background = c.color;
        cell.appendChild(cat);
        frag.appendChild(cell);
      }
    }
    this.strip.appendChild(frag);
  }

  draw() {
    this.strip.style.transform = `translate3d(0, ${-this.pos}px, 0)`;
  }

  startSpin(delay = 0) {
    this.mode = "accel";
    this.accelStart = performance.now() + delay;
    this.maxSpeed = 2.6 + this.index * 0.25 + Math.random() * 0.4; // px/ms
    this.el.classList.remove("landed");
  }

  /* 停止：forbidden に含まれないツールへ着地する（onlyCat指定でカテゴリ確定） */
  planStop(forbiddenNames, effect = "normal", onlyCat = null) {
    let candidates = this.order
      .map((ti, slot) => ({ tool: TOOLS[ti], slot }))
      .filter((c) => !forbiddenNames.has(c.tool.name));
    if (onlyCat) {
      const catCands = candidates.filter((c) => c.tool.cat === onlyCat);
      if (catCands.length) candidates = catCands;
    }
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    this.resultTool = pick.tool;
    this.centerSlot = pick.slot;

    const H = ITEM_H(), L = LOOP();
    // slot番目のセルが中央(payline)に来る停止位置
    const targetMod = mod((pick.slot - 1) * H, L);
    const startPos = this.pos;
    let delta = mod(targetMod - mod(startPos, L), L);

    const conf = {
      normal:  { minDist: L * 0.8, dur: 1100, ease: easeOutQuart },
      slam:    { minDist: H * 4,   dur: 420,  ease: easeOutQuart },
      jirashi: { minDist: L * 1.6, dur: 3200, ease: easeOutQuint },
      reverse: { minDist: L * 0.8, dur: 1000, ease: easeOutQuart },
    }[effect];

    while (delta < conf.minDist) delta += L;

    this.mode = "stopping";
    this.anim = {
      effect,
      startPos,
      delta,
      dur: conf.dur,
      ease: conf.ease,
      t0: performance.now(),
      lastTickCell: -1,
      revDone: false,
    };
  }

  update(now, dt) {
    const L = LOOP();
    if (this.mode === "accel") {
      if (now >= this.accelStart) {
        this.speed = Math.min(this.maxSpeed, this.speed + dt * 0.008);
        if (this.speed >= this.maxSpeed) this.mode = "spin";
        this.pos = mod(this.pos + this.speed * dt, L);
        this.strip.classList.add("blur");
      }
    } else if (this.mode === "spin") {
      this.pos = mod(this.pos + this.speed * dt, L);
    } else if (this.mode === "stopping") {
      const a = this.anim;

      // 逆回転演出：最初の300msだけ逆走してから本停止へ
      if (a.effect === "reverse" && !a.revDone) {
        const rt = (now - a.t0) / 300;
        if (rt < 1) {
          this.pos = mod(a.startPos - easeInOut(rt) * ITEM_H() * 1.2, L);
          this.draw();
          return;
        }
        a.revDone = true;
        a.delta += a.startPos - this.pos + (a.startPos > this.pos ? 0 : L); // 逆走ぶんを補正
        a.startPos = this.pos;
        a.t0 = now;
      }

      const t = Math.min(1, (now - a.t0) / a.dur);
      this.pos = mod(a.startPos + a.delta * a.ease(t), L);

      // 減速中のコマ送りチック音
      const cell = Math.floor(this.pos / ITEM_H());
      if (cell !== a.lastTickCell && t > 0.35) { sndTick(); a.lastTickCell = cell; }
      if (t > 0.4) this.strip.classList.remove("blur");

      if (t >= 1) {
        this.pos = mod(a.startPos + a.delta, L);
        this.mode = "stopped";
        if (this.onLanded) this.onLanded(this);
      }
    }
    this.draw();
  }

  flash() {
    this.flashEl.classList.remove("go");
    void this.flashEl.offsetWidth;
    this.flashEl.classList.add("go");
  }
}

/* ---------- 紙吹雪 ---------- */
const confettiCanvas = document.getElementById("confetti");
const cctx = confettiCanvas.getContext("2d");
let confettiParts = [];
function resizeConfetti() {
  confettiCanvas.width = innerWidth;
  confettiCanvas.height = innerHeight;
}
addEventListener("resize", resizeConfetti);
resizeConfetti();

function burstConfetti(x, y, count = 60, spread = 7) {
  const colors = ["#ffd54a", "#ff5c9e", "#6ef3ff", "#8b5cf6", "#22e58e", "#ff9b3d"];
  for (let i = 0; i < count; i++) {
    confettiParts.push({
      x, y,
      vx: (Math.random() - 0.5) * spread,
      vy: -Math.random() * spread - 2,
      w: 5 + Math.random() * 6,
      h: 3 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    });
  }
}

/* 採掘テーマの絵文字破片（岩・宝石・ツルハシ） */
const DIG_EMOJIS = ["🪨", "💎", "⛏️", "✨", "⚡", "🪙"];
function burstEmoji(x, y, count = 10, spread = 8) {
  for (let i = 0; i < count; i++) {
    confettiParts.push({
      x, y,
      vx: (Math.random() - 0.5) * spread,
      vy: -Math.random() * spread - 3,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.25,
      char: DIG_EMOJIS[Math.floor(Math.random() * DIG_EMOJIS.length)],
      size: 16 + Math.random() * 14,
      life: 1,
    });
  }
}
function rainConfetti() {
  for (let i = 0; i < 3; i++) {
    burstConfetti(Math.random() * innerWidth, -20, 4, 3);
  }
}
function rainCoins(n = 2) {
  for (let i = 0; i < n; i++) {
    confettiParts.push({
      x: Math.random() * innerWidth, y: -30,
      vx: (Math.random() - .5) * 1.5,
      vy: 1 + Math.random() * 2,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - .5) * .2,
      char: "🪙",
      size: 16 + Math.random() * 18,
      life: 1,
    });
  }
}
function updateConfetti() {
  cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParts = confettiParts.filter((p) => p.life > 0 && p.y < innerHeight + 40);
  for (const p of confettiParts) {
    p.vy += 0.15;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life -= 0.004;
    cctx.save();
    cctx.translate(p.x, p.y);
    cctx.rotate(p.rot);
    cctx.globalAlpha = Math.max(0, p.life);
    if (p.char) {
      cctx.font = `${p.size}px serif`;
      cctx.textAlign = "center";
      cctx.textBaseline = "middle";
      cctx.fillText(p.char, 0, 0);
    } else {
      cctx.fillStyle = p.color;
      cctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    }
    cctx.restore();
  }
}

/* ---------- 背景パーティクル（星＋漂う絵文字） ---------- */
const bgCanvas = document.getElementById("bg");
const bctx = bgCanvas.getContext("2d");
let stars = [], floaters = [];
function initBg() {
  bgCanvas.width = innerWidth;
  bgCanvas.height = innerHeight;
  stars = Array.from({ length: 70 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: 0.6 + Math.random() * 1.6,
    phase: Math.random() * Math.PI * 2,
    speed: 0.5 + Math.random() * 1.5,
  }));
  const chars = ["🪨", "💎", "⚙️", "💾", "🖥️", "📡", "🛰️", "🔩"];
  floaters = Array.from({ length: 10 }, (_, i) => ({
    char: chars[i % chars.length],
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    size: 16 + Math.random() * 22,
    vy: 0.1 + Math.random() * 0.25,
    sway: Math.random() * Math.PI * 2,
  }));
}
addEventListener("resize", initBg);
initBg();

function updateBg(now) {
  bctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  for (const s of stars) {
    const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(now / 1000 * s.speed + s.phase));
    bctx.globalAlpha = a;
    bctx.fillStyle = "#cfd8ff";
    bctx.beginPath();
    bctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    bctx.fill();
  }
  bctx.textAlign = "center";
  bctx.textBaseline = "middle";
  for (const f of floaters) {
    f.y -= f.vy;
    f.sway += 0.008;
    if (f.y < -40) { f.y = innerHeight + 40; f.x = Math.random() * innerWidth; }
    bctx.globalAlpha = 0.14;
    bctx.font = `${f.size}px serif`;
    bctx.fillText(f.char, f.x + Math.sin(f.sway) * 20, f.y);
  }
  bctx.globalAlpha = 1;
}

/* ---------- 図鑑 (localStorage) ---------- */
const ZUKAN_KEY = "it-dig-slot-zukan-v2"; // v2: IT_tool_Creatte版ラインナップ
function loadZukan() {
  try { return new Set(JSON.parse(localStorage.getItem(ZUKAN_KEY)) || []); }
  catch { return new Set(); }
}
function saveZukan(set) {
  localStorage.setItem(ZUKAN_KEY, JSON.stringify([...set]));
}
function renderZukan() {
  document.getElementById("zukan").textContent = `📖 発掘図鑑 ${loadZukan().size} / ${N}`;
}

/* ---------- ゲーム本体 ---------- */
const reelEls = [...document.querySelectorAll(".reel")];
const reels = reelEls.map((el, i) => new Reel(el, i));

// リサイズで --item-h が変わっても停止中のコマがズレないよう再スナップ
addEventListener("resize", () => {
  for (const r of reels) {
    if (r.mode === "idle" || r.mode === "stopped") {
      r.pos = mod((r.centerSlot - 1) * ITEM_H(), LOOP());
      r.draw();
    }
  }
});
const mainBtn = document.getElementById("mainBtn");
const mainBtnText = document.getElementById("mainBtnText");
const machine = document.getElementById("machine");
const callout = document.getElementById("callout");
const resultSec = document.getElementById("result");
const lamps = [...document.querySelectorAll(".lamp")];

let phase = "idle"; // idle | spinning | done
let nextStop = 0;
let lastEffect = "normal";
let lampTimer = null;

/* ---------- 筐体まわりのチェイス電飾 ---------- */
const bulbsBox = document.getElementById("bulbs");
function layoutBulbs() {
  bulbsBox.replaceChildren();
  const w = bulbsBox.clientWidth;
  const h = bulbsBox.clientHeight;
  const perimeter = 2 * (w + h);
  const count = Math.max(24, Math.round(perimeter / 60));
  for (let i = 0; i < count; i++) {
    const d = (i / count) * perimeter;
    let x, y;
    if (d < w) { x = d; y = 0; }
    else if (d < w + h) { x = w; y = d - w; }
    else if (d < 2 * w + h) { x = w - (d - w - h); y = h; }
    else { x = 0; y = h - (d - 2 * w - h); }
    const b = elem("span", "bulb");
    b.style.left = `${x}px`;
    b.style.top = `${y}px`;
    b.style.animationDelay = `${-(i / count) * 1.6}s`;
    bulbsBox.appendChild(b);
  }
}
addEventListener("resize", layoutBulbs);
layoutBulbs();

/* ---------- カットイン演出 ---------- */
const cutinEl = document.getElementById("cutin");
const cutinText = document.getElementById("cutinText");
let cutinTimer = null;
function showCutin(text, color = "") {
  playSfx("cutin", .6);
  cutinText.textContent = text;
  cutinEl.className = "cutin"; // 色クラスをリセット
  void cutinEl.offsetWidth;
  if (color) cutinEl.classList.add(color);
  cutinEl.classList.add("go");
  clearTimeout(cutinTimer);
  cutinTimer = setTimeout(() => cutinEl.classList.remove("go"), 1200);
}

/* ---------- 発掘ムービー（canvas製カットシーン） ---------- */
const movieEl = document.getElementById("movie");
const movieCanvas = document.getElementById("movieCanvas");
const movieCaption = document.getElementById("movieCaption");
const mctx = movieCanvas.getContext("2d");
const MW = 640, MH = 360;
let movie = null;
let moviePlaying = false;

/* ユーザー提供の実写ムービー（assets/video/）。再生できない場合はcanvas版に自動フォールバック */
const movieVideo = document.getElementById("movieVideo");
const MOVIE_SRC = {
  drill: "assets/video/掘削ムービー.mp4",
  meteor: "assets/video/流星ムービー.mp4",
};

function playMovie(kind, dur, onDone) {
  moviePlaying = true;
  movieCaption.textContent =
    kind === "drill" ? "掘削中……AI級レア鉱脈の気配……!!" : "流星接近……AIツール確定チャンス!?";
  movieEl.classList.add("go");
  playSfx("cutin", .7);

  let settled = false;
  let safety = null;
  const cleanupVideo = () => {
    movieVideo.onended = movieVideo.onerror = null;
    clearTimeout(safety);
    movieVideo.pause();
  };
  const finish = () => {
    if (settled) return;
    settled = true;
    cleanupVideo();
    movieVideo.style.display = "none";
    movieEl.classList.remove("go");
    moviePlaying = false;
    if (onDone) onDone();
  };
  const fallbackToCanvas = () => {
    if (settled) return;
    settled = true;
    cleanupVideo();
    movieVideo.style.display = "none";
    movieCanvas.style.display = "block";
    const seeds = [];
    for (let i = 0; i < 60; i++) seeds.push(Math.random());
    movie = { kind, dur, onDone, t0: performance.now(), seeds, hitsDone: 0 };
  };

  movieCanvas.style.display = "none";
  movieVideo.style.display = "block";
  movieVideo.src = MOVIE_SRC[kind];
  movieVideo.muted = muted;
  movieVideo.volume = 0.9;
  movieVideo.currentTime = 0;
  movieVideo.onended = finish;
  movieVideo.onerror = fallbackToCanvas;
  safety = setTimeout(finish, 13000); // 動画が固まった場合の保険（本編10秒）
  movieVideo.play().catch(fallbackToCanvas);
}

function updateMovie(now) {
  if (!movie) return;
  const t = (now - movie.t0) / movie.dur;
  if (t >= 1) {
    movieEl.classList.remove("go");
    const cb = movie.onDone;
    movie = null;
    moviePlaying = false;
    if (cb) cb();
    return;
  }
  if (movie.kind === "drill") drawDrillMovie(t, now);
  else drawMeteorMovie(t, now);
}

/* 掘削ムービー：岩盤を掘り進む→ダイヤ出現 */
function drawDrillMovie(t, now) {
  const s = movie.seeds;
  mctx.save();
  if (t < 0.72) mctx.translate((Math.random() - .5) * 8, (Math.random() - .5) * 8);

  const grad = mctx.createRadialGradient(MW / 2, MH / 2, 40, MW / 2, MH / 2, 400);
  grad.addColorStop(0, "#3a2a18");
  grad.addColorStop(1, "#0b0704");
  mctx.fillStyle = grad;
  mctx.fillRect(-10, -10, MW + 20, MH + 20);

  // 放射スピードライン
  mctx.strokeStyle = "rgba(255, 200, 120, .35)";
  for (let i = 0; i < 26; i++) {
    const ang = (i / 26) * Math.PI * 2 + now / 900;
    const r1 = 60 + s[i % 60] * 40;
    mctx.lineWidth = 1 + s[i % 60] * 2;
    mctx.beginPath();
    mctx.moveTo(MW / 2 + Math.cos(ang) * r1, MH / 2 + Math.sin(ang) * r1);
    mctx.lineTo(MW / 2 + Math.cos(ang) * 420, MH / 2 + Math.sin(ang) * 420);
    mctx.stroke();
  }

  // 飛んでくる岩
  mctx.textAlign = "center";
  mctx.textBaseline = "middle";
  for (let i = 0; i < 14; i++) {
    const p = (t * (0.8 + s[i] * 1.6) + s[i + 20]) % 1;
    const ang = s[i + 40] * Math.PI * 2;
    const r = 30 + p * 420;
    mctx.font = `${8 + p * 60}px serif`;
    mctx.globalAlpha = Math.min(1, p * 3);
    mctx.fillText("🪨", MW / 2 + Math.cos(ang) * r, MH / 2 + Math.sin(ang) * r);
  }
  mctx.globalAlpha = 1;

  // 中央のツルハシ（打撃モーション＋打撃音）
  const swing = Math.sin(now / 70) * 0.5;
  mctx.save();
  mctx.translate(MW / 2, MH / 2);
  mctx.rotate(swing);
  mctx.font = "96px serif";
  mctx.fillText("⛏️", 0, 0);
  mctx.restore();
  const hitIdx = Math.floor(t * 6);
  if (hitIdx > movie.hitsDone && t < 0.7) {
    movie.hitsDone = hitIdx;
    playSfx(`stop${(hitIdx % 3) + 1}`, .5);
  }

  // 火花
  if (t < 0.72) {
    mctx.strokeStyle = "rgba(255, 240, 150, .9)";
    mctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const ang = (now / 40 + i * 0.8) % (Math.PI * 2);
      const len = 20 + ((now / 6 + i * 37) % 40);
      mctx.beginPath();
      mctx.moveTo(MW / 2, MH / 2);
      mctx.lineTo(MW / 2 + Math.cos(ang) * len, MH / 2 + Math.sin(ang) * len);
      mctx.stroke();
    }
  }

  // クライマックス：フラッシュ→ダイヤ出現
  if (t >= 0.72) {
    const ft = (t - 0.72) / 0.28;
    if (ft < 0.3) {
      mctx.fillStyle = `rgba(255,255,255,${1 - ft / 0.3})`;
      mctx.fillRect(-10, -10, MW + 20, MH + 20);
    }
    mctx.save();
    mctx.translate(MW / 2, MH / 2);
    mctx.rotate(now / 1400);
    mctx.fillStyle = "rgba(255, 213, 74, .25)";
    for (let i = 0; i < 12; i++) {
      mctx.rotate(Math.PI / 6);
      mctx.beginPath();
      mctx.moveTo(0, 0);
      mctx.lineTo(300, -26);
      mctx.lineTo(300, 26);
      mctx.closePath();
      mctx.fill();
    }
    mctx.restore();
    const scale = 3 - Math.min(1, ft * 1.6) * 1.9;
    mctx.font = `${90 * scale}px serif`;
    mctx.globalAlpha = Math.min(1, ft * 2);
    mctx.fillText("💎", MW / 2, MH / 2);
    mctx.globalAlpha = 1;
    mctx.fillStyle = "#ffd54a";
    mctx.font = "900 34px sans-serif";
    mctx.fillText("激アツ確定!?", MW / 2, MH - 40);
  }
  mctx.restore();
}

/* 流星ムービー：彗星が横切り宝の雨が降る */
function drawMeteorMovie(t, now) {
  const s = movie.seeds;
  const grad = mctx.createLinearGradient(0, 0, 0, MH);
  grad.addColorStop(0, "#05041a");
  grad.addColorStop(1, "#1a0f36");
  mctx.fillStyle = grad;
  mctx.fillRect(0, 0, MW, MH);

  for (let i = 0; i < 50; i++) {
    mctx.globalAlpha = 0.3 + 0.7 * ((Math.sin(now / 300 + i) + 1) / 2) * s[i % 60];
    mctx.fillStyle = "#dfe6ff";
    mctx.fillRect(s[i % 60] * MW, s[(i + 17) % 60] * MH * 0.9, 2, 2);
  }
  mctx.globalAlpha = 1;
  mctx.textAlign = "center";
  mctx.textBaseline = "middle";

  const ex = MW * 0.62, ey = MH * 0.5;
  if (t < 0.5) {
    const p = t / 0.5;
    const cx = -60 + (ex + 60) * p;
    const cy = 40 + (ey - 40) * p;
    for (let i = 0; i < 14; i++) {
      const q = i / 14;
      mctx.globalAlpha = (1 - q) * 0.5;
      mctx.fillStyle = "#8fe3ff";
      mctx.beginPath();
      mctx.arc(cx - i * 26 * (1 - p * .3), cy - i * 14 * (1 - p * .3), 16 * (1 - q) + 2, 0, Math.PI * 2);
      mctx.fill();
    }
    mctx.globalAlpha = 1;
    mctx.font = "54px serif";
    mctx.fillText("☄️", cx, cy);
  } else {
    const p = (t - 0.5) / 0.5;
    if (p < 0.25) {
      mctx.fillStyle = `rgba(255,255,255,${1 - p / 0.25})`;
      mctx.fillRect(0, 0, MW, MH);
    }
    for (let i = 0; i < 30; i++) {
      const ang = s[i] * Math.PI * 2;
      const r = p * (80 + s[i + 30] * 260);
      mctx.globalAlpha = Math.max(0, 1 - p * 1.2);
      mctx.font = `${10 + s[i + 30] * 26}px serif`;
      mctx.fillText(["💎", "🪙", "✨"][i % 3], ex + Math.cos(ang) * r, ey + Math.sin(ang) * r);
    }
    mctx.globalAlpha = 1;
    mctx.fillStyle = "#6ef3ff";
    mctx.font = "900 34px sans-serif";
    mctx.fillText("超発掘チャンス!!", MW / 2, MH - 40);
  }
}

/* ---------- 発掘ズームカード（停止したツールのアップ表示） ---------- */
const zoomCard = document.getElementById("zoomCard");
const zcIcon = document.getElementById("zcIcon");
const zcName = document.getElementById("zcName");
const zcCat = document.getElementById("zcCat");
function showZoomCard(tool) {
  const c = CATS[tool.cat];
  zcIcon.replaceChildren(makeToolIcon(tool, "zc-img"));
  zcName.textContent = tool.name;
  zcCat.textContent = c.label;
  zcCat.style.background = c.color;
  zoomCard.classList.remove("pop");
  void zoomCard.offsetWidth;
  zoomCard.classList.add("pop");
}

/* ---------- 全画面フラッシュ / 衝撃波 ---------- */
const screenFlash = document.getElementById("screenFlash");
function flashScreen() {
  screenFlash.classList.remove("go");
  void screenFlash.offsetWidth;
  screenFlash.classList.add("go");
}
function shockwave(reelEl) {
  const win = reelEl.querySelector(".window");
  const wave = elem("span", "shockwave");
  win.appendChild(wave);
  setTimeout(() => wave.remove(), 600);
}

/* ---------- ティッカー（全ツール名が流れる帯） ---------- */
function buildTicker() {
  const track = document.getElementById("tickerTrack");
  track.replaceChildren();
  for (let rep = 0; rep < 2; rep++) { // 2周ぶん並べてシームレスループ
    for (const t of TOOLS) {
      track.appendChild(elem("span", null, `${t.icon} ${t.name}`));
    }
  }
}
buildTicker();

function showCallout(text, big = false, gold = false) {
  callout.textContent = text;
  callout.classList.remove("pop");
  callout.classList.toggle("gold", gold);
  void callout.offsetWidth;
  callout.classList.add("pop");
  machine.classList.remove("shake", "bigshake");
  void machine.offsetWidth;
  machine.classList.add(big ? "bigshake" : "shake");
}

function startLamps(fast = false) {
  stopLamps();
  let i = 0;
  lampTimer = setInterval(() => {
    lamps.forEach((l, j) => l.classList.toggle("on", (j + i) % 3 === 0));
    i++;
  }, fast ? 90 : 220);
}
function stopLamps(allOn = false) {
  clearInterval(lampTimer);
  lamps.forEach((l) => l.classList.toggle("on", allOn));
}

function startGame() {
  ensureAudio();
  playSfx("lever", .8);
  playSfx("start", .7);
  startWhir();
  phase = "spinning";
  nextStop = 0;
  resultSec.classList.add("hidden");
  reelEls.forEach((el) => el.classList.remove("hot", "landed"));
  reels.forEach((r, i) => { r.resultTool = null; r.speed = 0; r.startSpin(i * 160); });
  mainBtn.classList.add("stop-mode");
  mainBtnText.textContent = "ストップ！";
  machine.classList.add("spinning");
  startLamps();

  // レバーを引く
  const lever = document.getElementById("lever");
  lever.classList.remove("pulled");
  void lever.offsetWidth;
  lever.classList.add("pulled");
}

function stopNext() {
  if (moviePlaying) return; // ムービー中は操作を受け付けない
  if (nextStop >= reels.length) return;
  const reel = reels[nextStop];
  if (reel.mode !== "spin" && reel.mode !== "accel") return; // 停止処理中は無視

  const forbidden = new Set(
    reels.filter((r) => r.resultTool).map((r) => r.resultTool.name)
  );

  const isLast = nextStop === reels.length - 1;
  nextStop++;

  if (!isLast) {
    // 2番目のリールでもたまにチャンス煽り
    if (nextStop === 2 && Math.random() < 0.3) showCutin("チャンス!?", "gold");
    reel.onLanded = (r) => onReelLanded(r, false);
    reel.planStop(forbidden, "normal");
    return;
  }

  // 最終リール：4種の演出から抽選
  const roll = Math.random();
  const effect = roll < 0.25 ? "slam" : roll < 0.5 ? "jirashi" : roll < 0.75 ? "reverse" : "rainbow";
  lastEffect = effect;
  reel.el.classList.add("hot");
  startLamps(true);
  reel.onLanded = (r) => onReelLanded(r, true);

  if (effect === "rainbow") {
    // プレミア：発掘ムービーが流れてからのスラム停止。当たりは必ずAIツール
    const kind = Math.random() < 0.5 ? "drill" : "meteor";
    playMovie(kind, 2800, () => {
      playSfx("bell", .8);
      reel.planStop(forbidden, "slam", "AI");
    });
    return;
  }
  if (effect === "slam")    showCutin("激アツ!!", "gold");
  if (effect === "jirashi") showCutin("まだだ…まだ終わらんよ…");
  if (effect === "reverse") showCutin("な、なんと逆回転!?", "cyan");
  reel.planStop(forbidden, effect);
}

function onReelLanded(reel, isLast) {
  if (isLast) playSfx("slam", .9);
  else playSfx(`stop${(reel.index % 3) + 1}`, .85);
  reel.flash();
  reel.el.classList.add("landed");
  shockwave(reel.el);
  const rect = reel.el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const mega = lastEffect === "rainbow" && isLast;
  burstConfetti(cx, cy, mega ? 150 : isLast ? 90 : 30);
  burstEmoji(cx, cy, mega ? 30 : isLast ? 18 : 8);

  if (!isLast) {
    showCallout(CALLOUTS[Math.floor(Math.random() * CALLOUTS.length)]);
    setTimeout(() => showZoomCard(reel.resultTool), 140);
  } else {
    reel.el.classList.remove("hot");
    flashScreen();
    if (mega) playSfx("bell", .9);
    showCallout(LAST_CALLOUTS[lastEffect] || "発掘完了!!", true, mega);
    setTimeout(() => showZoomCard(reel.resultTool), 700);
    finishGame();
  }
}

function finishGame() {
  phase = "done";
  stopLamps(true);
  stopWhir();
  playSfx(lastEffect === "rainbow" ? "bigwin" : "fanfare", .8);
  [200, 480, 760].forEach((d, i) =>
    setTimeout(() => playSfx(i % 2 ? "coins2" : "coin", .75), d)
  );
  machine.classList.remove("spinning");
  machine.classList.add("bigshake");
  mainBtn.classList.remove("stop-mode");
  mainBtnText.textContent = "もう一回掘る";

  const mega = lastEffect === "rainbow";
  let rains = 0;
  const rainInt = setInterval(() => {
    rainConfetti();
    rainCoins(mega ? 4 : 2);
    if (++rains > (mega ? 110 : 60)) clearInterval(rainInt);
  }, 50);

  setTimeout(showResult, 700);
}

function showResult() {
  const picked = reels.map((r) => r.resultTool);
  const zukan = loadZukan();
  const cards = document.getElementById("resultCards");
  cards.replaceChildren();

  for (const t of picked) {
    const isNew = !zukan.has(t.name);
    zukan.add(t.name);
    const c = CATS[t.cat];
    const card = elem("a", "tool-card");
    card.href = DETAIL_BASE + t.id + ".html";
    card.target = "_blank";
    card.rel = "noopener";
    if (isNew) card.appendChild(elem("span", "new-badge", "NEW!"));
    const iconWrap = elem("div", "icon");
    iconWrap.appendChild(makeToolIcon(t, "card-img"));
    card.appendChild(iconWrap);
    card.appendChild(elem("h3", null, t.name));
    const cat = elem("span", "cat", c.label);
    cat.style.background = c.color;
    card.appendChild(cat);
    card.appendChild(elem("p", null, t.desc));
    cards.appendChild(card);
  }
  saveZukan(zukan);
  renderZukan();

  // 相性スコア（組み合わせから決まる固定値。同じ組み合わせは同じ点数）
  const seed = picked.map((t) => t.name).join("|");
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const score = 60 + (h % 41); // 60〜100
  const comment = SYNERGY_COMMENTS[h % SYNERGY_COMMENTS.length];

  const synergy = document.getElementById("synergy");
  synergy.replaceChildren();
  synergy.appendChild(document.createTextNode(
    `本日の発掘チーム「${picked.map((t) => t.name).join(" × ")}」`
  ));
  synergy.appendChild(document.createElement("br"));
  synergy.appendChild(document.createTextNode("相性診断 "));
  const scoreEl = elem("span", "score", "0点");
  synergy.appendChild(scoreEl);
  synergy.appendChild(document.createElement("br"));
  synergy.appendChild(document.createTextNode(comment));

  // スコアをドラムロール式にカウントアップ
  const t0 = performance.now();
  const DUR = 1200;
  (function tick(now) {
    const t = Math.min(1, (now - t0) / DUR);
    const v = Math.round(score * easeOutQuart(t));
    scoreEl.textContent = `${v}点`;
    if (t < 1) requestAnimationFrame(tick);
    else {
      playSfx("coin", .7);
      const r = resultSec.getBoundingClientRect();
      burstConfetti(r.left + r.width / 2, r.top + 80, 50);
      burstEmoji(r.left + r.width / 2, r.top + 80, 12);
    }
  })(t0);

  resultSec.classList.remove("hidden");
  resultSec.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ---------- 入力 ---------- */
mainBtn.addEventListener("click", () => {
  ensureAudio();
  if (moviePlaying) return;
  if (phase === "idle" || phase === "done") startGame();
  else if (phase === "spinning") stopNext();
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    mainBtn.click();
  }
});

document.getElementById("muteBtn").addEventListener("click", (e) => {
  muted = !muted;
  e.currentTarget.textContent = muted ? "🔇" : "🔊";
  if (whirNodes) whirNodes.g.gain.value = muted ? 0 : 0.035;
  movieVideo.muted = muted;
});

/* ---------- メインループ ---------- */
let lastTime = performance.now();
function loop(now) {
  const dt = Math.min(50, now - lastTime);
  lastTime = now;
  for (const r of reels) {
    if (r.mode === "accel" || r.mode === "spin" || r.mode === "stopping") r.update(now, dt);
  }
  updateConfetti();
  updateBg(now);
  updateMovie(now);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

renderZukan();
