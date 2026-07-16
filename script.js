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

/* easy: 初学者向けの「どんなツール？」解説 / strengths: 得意なこと3点 */
const TOOLS = [
  // AI (6) — 激レア演出の当たり枠
  { id: "chatgpt", name: "ChatGPT", icon: "🤖", cat: "AI", img: "01_chatgpt.png",
    desc: "OpenAIの高性能AIチャット",
    easy: "質問や頼みごとを日本語で入力すると、AIが文章で答えてくれる会話型アシスタント。メールの下書きから調べものまで何でも相談できます。",
    strengths: ["文章の作成・要約・翻訳", "プログラムコードの作成支援", "アイデア出しや調べものの相談相手"] },
  { id: "claude", name: "Claude", icon: "🌿", cat: "AI", img: "02_claude.png",
    desc: "Anthropicの安全性重視AI",
    easy: "長い資料を丸ごと読み込んで、要約や分析をしてくれるAIアシスタント。ていねいで安全な回答が得意な、頼れる仕事の相棒です。",
    strengths: ["長い文書を読み込んで要約・分析", "複雑な内容の整理と筋道立った説明", "安全性に配慮した誠実な回答"] },
  { id: "gemini", name: "Gemini", icon: "♊", cat: "AI", img: "03_gemini.png",
    desc: "GoogleのマルチモーダルAI",
    easy: "Google製のAIアシスタント。文章だけでなく画像や動画も理解でき、GmailやGoogleドキュメントと組み合わせて使えます。",
    strengths: ["文章・画像・動画をまとめて理解", "Googleの各サービスと連携", "最新情報を検索しながら回答"] },
  { id: "notebooklm", name: "NotebookLM", icon: "📓", cat: "AI", img: "04_notebooklm.png",
    desc: "Googleのドキュメント特化AI",
    easy: "自分がアップロードした資料だけを元に答えてくれるAIノート。社内資料や論文の「専属解説役」を作れるイメージです。",
    strengths: ["複数の資料をまたいで質問できる", "自動で要約や目次を作成", "出典付きで答えてくれるので安心"] },
  { id: "perplexity", name: "Perplexity", icon: "🔎", cat: "AI", img: "05_perplexity.png",
    desc: "AI搭載のリアルタイム検索エンジン",
    easy: "AIがインターネットを検索して、出典リンク付きで答えをまとめてくれる新しい検索エンジン。「ググる」の進化版です。",
    strengths: ["最新のWeb情報をAIが要約", "情報の出どころ（URL）を明示", "追加質問でどんどん深掘りできる"] },
  { id: "copilot", name: "Microsoft Copilot", icon: "🪁", cat: "AI", img: "06_microsoft_copilot.png",
    desc: "Microsoft 365に統合されたAI",
    easy: "WordやExcelなどMicrosoftのソフトに組み込まれたAI。資料の下書きや会議メモの要約を自動でこなしてくれます。",
    strengths: ["Word/Excel/PowerPointの資料をAIが下書き", "Teams会議の内容を自動で要約", "メールの返信案を自動作成"] },
  // コミュニケーション (4)
  { id: "slack", name: "Slack", icon: "💬", cat: "コミュニケーション", img: "07_slack.png",
    desc: "チームのハブとなるビジネスチャット",
    easy: "仕事仲間と話題ごとの「チャンネル」で会話できるビジネスチャット。メールより速く、気軽にやり取りできます。",
    strengths: ["話題ごとに会話を整理できる", "2,000以上の他ツールと連携", "音声通話にもすぐ切り替え"] },
  { id: "teams", name: "Microsoft Teams", icon: "🟦", cat: "コミュニケーション", img: "08_microsoft_teams.png",
    desc: "Microsoft 365統合のコラボ基盤",
    easy: "チャット・ビデオ会議・ファイル共有が1つになったMicrosoftのツール。WordやExcelとの相性が抜群です。",
    strengths: ["チャットと会議をこれ1つで完結", "Officeファイルをみんなで同時編集", "社外の人も会議に招待できる"] },
  { id: "chatwork", name: "Chatwork", icon: "💭", cat: "コミュニケーション", img: "09_chatwork.png",
    desc: "国内シェアNo.1のビジネスチャット",
    easy: "国産のシンプルなビジネスチャット。ITが苦手な人でも迷わず使える画面が魅力で、中小企業を中心に人気です。",
    strengths: ["画面がシンプルで覚えやすい", "チャットからそのままタスク管理", "取引先ともつながりやすい"] },
  { id: "lineworks", name: "LINE WORKS", icon: "💚", cat: "コミュニケーション", img: "10_line_works.png",
    desc: "LINEライクなビジネス版チャット",
    easy: "ふだんのLINEと同じ感覚で使える仕事用チャット。スタンプや既読表示もあり、現場スタッフにもなじみやすいです。",
    strengths: ["LINEと同じ操作感ですぐ使える", "スタンプ・既読確認に対応", "勤怠やアンケート機能も内蔵"] },
  // ビデオ会議 (2)
  { id: "zoom", name: "Zoom", icon: "📹", cat: "ビデオ会議", img: "11_zoom.png",
    desc: "世界標準のオンライン会議ツール",
    easy: "離れた場所の人とビデオ通話で会議ができる定番ツール。会議のURLを送るだけで、誰でも簡単に参加してもらえます。",
    strengths: ["大人数のオンラインイベントに強い", "少人数グループに分かれて話し合える", "AIが議事録・要約を自動作成"] },
  { id: "meet", name: "Google Meet", icon: "📺", cat: "ビデオ会議", img: "12_google_meet.png",
    desc: "Google Workspace統合のビデオ通話",
    easy: "Google製のビデオ会議ツール。アプリを入れなくてもブラウザから参加でき、Googleカレンダーの予定からワンクリックで開けます。",
    strengths: ["カレンダーの予定からすぐ参加", "ソフトのインストール不要", "自動字幕で聞き逃しを防げる"] },
  // 生産性スイート (2)
  { id: "gws", name: "Google Workspace", icon: "🌐", cat: "生産性スイート", img: "13_google_workspace.png",
    desc: "Google製クラウドビジネスツール群",
    easy: "Gmail・カレンダー・ドキュメント・スプレッドシートなど、仕事に必要な道具がまるごとそろったGoogleのセットです。",
    strengths: ["複数人で同じファイルを同時編集", "ネットがあればどこでも仕事できる", "データはクラウドに自動保存"] },
  { id: "m365", name: "Microsoft 365", icon: "🪟", cat: "生産性スイート", img: "14_microsoft_365.png",
    desc: "Word・Excel・PowerPointのクラウド版",
    easy: "Word・Excel・PowerPointをクラウドで使えるMicrosoftのセット。会社のパソコン仕事の定番がぜんぶ入っています。",
    strengths: ["おなじみOfficeソフトの最新版が使える", "ファイルをクラウドで一元管理", "AI機能（Copilot）も組み込める"] },
  // ドキュメント管理 (4)
  { id: "notion", name: "Notion", icon: "📄", cat: "ドキュメント管理", img: "15_notion.png",
    desc: "メモ・Wiki・DB・プロジェクトを一元化",
    easy: "メモ・表・タスク管理を1つのページに自由に組み合わせられる「万能ノート」。チームの情報置き場として大人気です。",
    strengths: ["メモも表も掲示板も自由に作れる", "AIが文章作成や要約を手伝ってくれる", "チームの知識をきれいに整理できる"] },
  { id: "dropbox", name: "Dropbox", icon: "📦", cat: "ドキュメント管理", img: "16_dropbox.png",
    desc: "シンプル・高速なクラウドストレージ",
    easy: "ファイルをインターネット上に保存して、どの端末からでも開けるようにする「クラウドの収納箱」です。",
    strengths: ["パソコンのフォルダと自動で同期", "大きなファイルも簡単に共有", "間違って消しても元に戻せる"] },
  { id: "box", name: "Box", icon: "📫", cat: "ドキュメント管理", img: "17_box.png",
    desc: "エンタープライズ向けセキュアクラウドストレージ",
    easy: "会社向けの安全性がとても高いファイル保管サービス。「誰がどのファイルを見られるか」を細かく決められるのが特長です。",
    strengths: ["セキュリティの国際認証が充実", "閲覧・編集の権限を細かく設定", "1,500以上の業務ツールと連携"] },
  { id: "confluence", name: "Confluence", icon: "📚", cat: "ドキュメント管理", img: "18_confluence.png",
    desc: "Atlassianのチームwikiプラットフォーム",
    easy: "チームの手順書や議事録をためていく「社内版Wikipedia」を作れるツール。散らばりがちな知識を1か所に集められます。",
    strengths: ["議事録・仕様書のテンプレートが豊富", "タスク管理ツールJiraと連携", "チームごとにページを整理できる"] },
  // プロジェクト管理 (6)
  { id: "asana", name: "Asana", icon: "🎯", cat: "プロジェクト管理", img: "19_asana.png",
    desc: "タスク・プロジェクトを可視化するPM",
    easy: "「誰が・何を・いつまでに」やるかを見える化するタスク管理ツール。仕事の抜け漏れや遅れを防いでくれます。",
    strengths: ["スケジュールを帯グラフで確認できる", "毎回の繰り返し作業を自動化", "複数プロジェクトをまとめて俯瞰"] },
  { id: "trello", name: "Trello", icon: "🗂", cat: "プロジェクト管理", img: "20_trello.png",
    desc: "カンバンボードで直感管理",
    easy: "やることを付箋のようなカードにして「未着手→作業中→完了」と動かして管理する、いちばん簡単なタスク管理ボードです。",
    strengths: ["ドラッグ&ドロップの簡単操作", "必要な機能をあとから追加できる", "無料プランでも十分使える"] },
  { id: "backlog", name: "Backlog", icon: "📋", cat: "プロジェクト管理", img: "21_backlog.png",
    desc: "国産の開発・プロジェクト管理ツール",
    easy: "日本製のプロジェクト管理ツール。タスク管理とシステム開発用の機能がセットになっていて、日本語サポートも安心です。",
    strengths: ["タスクと開発の管理がひとまとめ", "工程表（ガントチャート）で進捗管理", "日本語のマニュアル・サポートが充実"] },
  { id: "jira", name: "Jira", icon: "📌", cat: "プロジェクト管理", img: "22_jira.png",
    desc: "アジャイル開発の定番ツール",
    easy: "ソフトウェア開発チームの定番タスク管理ツール。短い期間で作っては見直す「アジャイル開発」の進め方が得意です。",
    strengths: ["開発の計画と進み具合を見える化", "文書ツールConfluenceと連携", "チームのルールに合わせて細かく設定"] },
  { id: "monday", name: "monday.com", icon: "📅", cat: "プロジェクト管理", img: "23_monday.png",
    desc: "視覚的で柔軟なワークOSプラットフォーム",
    easy: "カラフルな表で仕事を管理できるツール。豊富なテンプレートを、自分たちの仕事に合わせて自由に作り替えられます。",
    strengths: ["ボードを自由にカスタマイズ", "200以上のテンプレートから選べる", "グラフで状況をひと目で把握"] },
  { id: "clickup", name: "ClickUp", icon: "🚀", cat: "プロジェクト管理", img: "24_clickup.png",
    desc: "タスク管理の究極オールインワン",
    easy: "タスク・文書・目標管理などを1つに詰め込んだ「全部入り」ツール。リストやカレンダーなど見せ方も自由に切り替えられます。",
    strengths: ["15種類以上の表示切り替え", "メモ・Wiki機能も内蔵", "無料プランでも高機能"] },
  // CRM・営業 (5)
  { id: "salesforce", name: "Salesforce", icon: "☁", cat: "CRM・営業", img: "25_salesforce.png",
    desc: "世界シェアNo.1のCRM/SFAプラットフォーム",
    easy: "「どのお客様と、どんな商談がどこまで進んでいるか」を管理する営業支援ツールの世界王者。売上の予測までできます。",
    strengths: ["商談の進み具合を一元管理", "売上の見込みを自動で計算", "拡張機能で自社に合わせて成長"] },
  { id: "hubspot", name: "HubSpot", icon: "🧲", cat: "CRM・営業", img: "26_hubspot.png",
    desc: "無料から始められるCRM・MA統合ツール",
    easy: "顧客管理・メール配信・Web集客をまとめてできるツール。無料から始められるので、営業DXの入門にぴったりです。",
    strengths: ["無料で顧客管理を始められる", "メール配信や集客機能も内蔵", "顧客の行動を記録して営業に活用"] },
  { id: "linebiz", name: "公式LINE", icon: "🟩", cat: "CRM・営業", img: "27_official_line.png",
    desc: "9,500万ユーザーへの直接リーチ",
    easy: "お店や会社の「公式LINEアカウント」を作って、お客様にメッセージやクーポンを直接届けられるサービスです。",
    strengths: ["お客様のLINEに直接お知らせを配信", "自動返信・チャットボットに対応", "メニュー画面から予約や注文へ誘導"] },
  { id: "mailchimp", name: "Mailchimp", icon: "📧", cat: "CRM・営業", img: "28_mailchimp.png",
    desc: "世界最大のメールマーケティングツール",
    easy: "お知らせメール（メルマガ）を簡単に作って一斉配信できるツール。どれだけ読まれたかの効果測定までセットです。",
    strengths: ["ドラッグ&ドロップでメール作成", "開封率などの効果を測定できる", "相手に合わせた自動配信"] },
  { id: "sansan", name: "Sansan", icon: "💼", cat: "CRM・営業", img: "29_sansan.png",
    desc: "名刺管理DXのリーディングカンパニー",
    easy: "もらった名刺をスキャンしてデータ化し、会社全体で共有できるサービス。「あの人誰だっけ？」がなくなります。",
    strengths: ["名刺を高精度でデータ化", "社内の人脈を全員で共有できる", "会社情報と自動でひも付け"] },
  // 自動化・RPA (4)
  { id: "zapier", name: "Zapier", icon: "⚡", cat: "自動化・RPA", img: "30_zapier.png",
    desc: "7,000以上のアプリをノーコードで連携",
    easy: "「Gmailに届いた添付ファイルをDropboxに保存」のように、ツール同士を自動でつなぐ接着剤。プログラミングは不要です。",
    strengths: ["7,000以上のアプリをつなげられる", "プログラミング不要で設定できる", "複数ステップの自動化も作れる"] },
  { id: "make", name: "Make", icon: "🔧", cat: "自動化・RPA", img: "31_make.png",
    desc: "視覚的なワークフロー自動化ツール",
    easy: "自動化の流れを図を描くように組み立てられるツール。「もし〜なら〜する」という条件付きの複雑な自動化に強いです。",
    strengths: ["図を描く感覚で自動化を設計", "条件分岐や繰り返しに対応", "1,700以上のアプリと連携"] },
  { id: "powerautomate", name: "Power Automate", icon: "🌊", cat: "自動化・RPA", img: "32_power_automate.png",
    desc: "Microsoft製のRPA・フロー自動化",
    easy: "Microsoft製の自動化ツール。Excelへの転記やOutlookのメール整理など、パソコンの繰り返し作業を代わりにやってくれます。",
    strengths: ["ExcelやOutlookの作業を自動化", "パソコン操作を記録してそのまま再現", "Microsoft 365との相性が抜群"] },
  { id: "uipath", name: "UiPath", icon: "🦾", cat: "自動化・RPA", img: "33_uipath.png",
    desc: "エンタープライズ向けRPAプラットフォーム",
    easy: "人がパソコンで行う操作をロボットに覚えさせて、そのまま自動で再現させる本格的な自動化（RPA）ツールです。",
    strengths: ["画面操作を記録して自動実行", "AIで紙の帳票も読み取れる", "たくさんのロボットをまとめて管理"] },
  // ローコード・DB (2)
  { id: "kintone", name: "kintone", icon: "⚙", cat: "ローコード・DB", img: "34_kintone.png",
    desc: "サイボウズのノーコード業務アプリ作成",
    easy: "プログラミングなしで「顧客リスト」「日報」などの業務アプリを自分で作れる、サイボウズの国産ツールです。",
    strengths: ["ドラッグ&ドロップでアプリ作成", "申請・承認の流れも設定できる", "日本語サポートが手厚い"] },
  { id: "airtable", name: "Airtable", icon: "📊", cat: "ローコード・DB", img: "35_airtable.png",
    desc: "スプレッドシート×データベースの融合",
    easy: "見た目はExcel、中身は本格データベース。同じデータをカレンダーやカード形式に切り替えて、柔軟に管理できます。",
    strengths: ["表計算の感覚でデータベースを作成", "表示形式を自由に切り替え", "業務別のテンプレートが豊富"] },
  // 経理・HR (5)
  { id: "freee", name: "freee", icon: "💰", cat: "経理・HR", img: "36_freee.png",
    desc: "中小企業向けクラウド会計・HR",
    easy: "銀行口座やカードの明細を自動で取り込んで、帳簿づけから確定申告まで助けてくれる会計ソフトです。",
    strengths: ["銀行・カード明細の自動取り込み", "帳簿づけをAIが提案してくれる", "確定申告の書類を自動作成"] },
  { id: "mfcloud", name: "マネーフォワード クラウド", icon: "💎", cat: "経理・HR", img: "37_moneyforward.png",
    desc: "上場企業から中小まで対応の経理DX",
    easy: "会計・請求書・経費精算・給与計算までカバーする経理のクラウドセット。会社のお金まわりをまとめて効率化します。",
    strengths: ["経費精算から会計までひとつながり", "電子帳簿保存法などの法律に対応", "銀行・カードと自動で連携"] },
  { id: "smarthr", name: "SmartHR", icon: "👥", cat: "経理・HR", img: "38_smarthr.png",
    desc: "労務・人事管理のクラウドNo.1",
    easy: "入社手続きや年末調整などの人事の書類仕事を、紙を使わずインターネット上で完結させるサービスです。",
    strengths: ["入退社の手続きをペーパーレス化", "年末調整もオンラインで完結", "従業員アンケート機能つき"] },
  { id: "jobcan", name: "ジョブカン", icon: "⏱", cat: "経理・HR", img: "39_jobcan.png",
    desc: "勤怠・給与・経費を一元管理",
    easy: "出退勤の記録・シフト作成・給与計算などをまとめて管理できる、国産の働き方管理ツールです。",
    strengths: ["打刻とシフト管理が簡単", "給与計算を自動化できる", "経費や交通費の精算にも対応"] },
  { id: "rakuraku", name: "楽楽精算", icon: "🧾", cat: "経理・HR", img: "40_rakuraku_seisan.png",
    desc: "経費精算に特化したクラウドサービス",
    easy: "領収書をスマホで撮るだけで経費精算の申請ができるサービス。上司の承認までの流れも自動化してくれます。",
    strengths: ["スマホ撮影だけで経費申請", "承認の流れを自動化", "電子帳簿保存法にも対応で安心"] },
  // デザイン (4)
  { id: "canva", name: "Canva", icon: "🎨", cat: "デザイン", img: "41_canva.png",
    desc: "ノンデザイナーが使える高品質デザインツール",
    easy: "豊富なテンプレートを選んで文字を入れ替えるだけで、チラシやSNS画像がプロっぽく作れるデザインツールです。",
    strengths: ["25万以上のテンプレート", "ロゴや配色をチームで統一できる", "作った画像をSNSへ直接投稿"] },
  { id: "figma", name: "Figma", icon: "🎭", cat: "デザイン", img: "42_figma.png",
    desc: "UIデザイン・プロトタイピングの世界標準",
    easy: "アプリやWebサイトの画面デザインを、ブラウザ上でみんなと同時に作れるツール。デザイナーの世界標準です。",
    strengths: ["複数人で同時にデザイン編集", "動く試作品（プロトタイプ）を作れる", "エンジニアへの受け渡しがスムーズ"] },
  { id: "adobeexpress", name: "Adobe Express", icon: "✨", cat: "デザイン", img: "43_adobe_express.png",
    desc: "Adobe製のかんたんデザインツール",
    easy: "デザインの知識がなくても、Adobeの高品質な素材を使ってバナーやチラシをサッと作れるお手軽ツールです。",
    strengths: ["プロ品質のAdobe素材が使える", "PDFやWordへの変換もできる", "AI（Firefly）で画像を生成"] },
  { id: "miro", name: "Miro", icon: "💡", cat: "デザイン", img: "44_miro.png",
    desc: "オンラインホワイトボード・ブレスト",
    easy: "みんなで付箋を貼りながらアイデア出しができる、無限に広がるオンラインのホワイトボードです。",
    strengths: ["広さ無限のホワイトボード", "付箋や図で考えを整理できる", "ビデオ会議をしながら共同作業"] },
  // 会議・録画 (3)
  { id: "otter", name: "Otter.ai", icon: "🦦", cat: "会議・録画", img: "45_otter_ai.png",
    desc: "AIリアルタイム文字起こし&要約",
    easy: "会議の音声をその場で文字に起こし、要点まで自動でまとめてくれるAI議事録ツール。議事録係が不要になります。",
    strengths: ["話した内容をその場で文字化", "要約と宿題（タスク）を自動で抽出", "ZoomやTeamsなどの会議と連携"] },
  { id: "tldv", name: "tl;dv", icon: "⏩", cat: "会議・録画", img: "46_tldv.png",
    desc: "会議録画+AIハイライト抽出",
    easy: "オンライン会議を自動で録画して、AIが大事な場面に印を付けてくれるツール。あとから要点だけサッと見返せます。",
    strengths: ["会議を自動録画してAIが要約", "重要シーンに時刻付きの印", "顧客管理ツールへメモを自動反映"] },
  { id: "loom", name: "Loom", icon: "🎬", cat: "会議・録画", img: "47_loom.png",
    desc: "画面録画+非同期コミュニケーション",
    easy: "パソコン画面と自分の顔を同時に録画して、説明動画をサッと共有できるツール。「会議の代わりに動画を送る」働き方ができます。",
    strengths: ["ワンクリックで画面を録画", "顔出し解説も同時にできる", "見た人がコメントで反応できる"] },
  // スケジュール (2)
  { id: "calendly", name: "Calendly", icon: "📆", cat: "スケジュール", img: "48_calendly.png",
    desc: "日程調整を完全自動化",
    easy: "自分の空き時間を相手に見せて、そのまま予約してもらえる日程調整ツール。「いつ空いてますか？」のメール往復が消えます。",
    strengths: ["カレンダー連携で空き時間を自動表示", "複数人の日程もまとめて調整", "会議URLの発行まで自動"] },
  { id: "timerex", name: "TimeRex", icon: "🗓", cat: "スケジュール", img: "49_timerex.png",
    desc: "日本企業向け日程調整ツール",
    easy: "日本のビジネスマナーに合わせて作られた国産の日程調整ツール。URLを送るだけで打ち合わせの日時が決まります。",
    strengths: ["空き時間を自動で相手に提示", "日本語で使いやすい画面", "ZoomやTeamsの会議URLも自動発行"] },
  // 決済 (1)
  { id: "stripe", name: "Stripe", icon: "💳", cat: "決済", img: "50_stripe.png",
    desc: "開発者フレンドリーな決済インフラ",
    easy: "Webサイトやアプリにクレジットカード決済の機能を組み込めるサービス。ネット上でお金を受け取る仕組みを作れます。",
    strengths: ["世界中の通貨・決済方法に対応", "月額課金（サブスク）の管理", "プログラミング不要の決済リンクも作れる"] },
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
  feint: "フェイントからの発掘!!",
  backstep: "一歩戻って発掘!!",
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
    let delta = mod(targetMod - mod(this.pos, L), L);

    // 停止演出をフェーズ列で定義。fakeLand=true のフェーズ終端で「偽の停止」演出が入る
    const Q = easeOutQuart, Q5 = easeOutQuint, IO = easeInOut;
    let phases;
    switch (effect) {
      case "slam": // 一撃ビタ止め
        while (delta < H * 4) delta += L;
        phases = [{ delta, dur: 420, ease: Q }];
        break;
      case "jirashi": // 長いじらし減速
        while (delta < L * 1.6) delta += L;
        phases = [{ delta, dur: 3200, ease: Q5 }];
        break;
      case "reverse": // 一瞬逆回転してから止まる
        while (delta < L * 0.8) delta += L;
        phases = [
          { delta: -H * 1.2, dur: 300, ease: IO },
          { delta: delta + H * 1.2, dur: 1000, ease: Q },
        ];
        break;
      case "feint": // 2コマ手前で止まったフリ→再加速して本当の停止
        while (delta < L * 0.8) delta += L;
        phases = [
          { delta: delta - H * 2, dur: 1100, ease: Q, fakeLand: true },
          { delta: H * 2, dur: 430, ease: Q, pauseBefore: 650 },
        ];
        break;
      case "backstep": // 1コマ行き過ぎて止まったフリ→静かに1コマ戻る
        while (delta < L * 0.8) delta += L;
        phases = [
          { delta: delta + H, dur: 1100, ease: Q, fakeLand: true },
          { delta: -H, dur: 420, ease: IO, pauseBefore: 650 },
        ];
        break;
      case "minifeint": // 通常リール用の小フェイント（1コマ手前で止まったフリ）
        while (delta < L * 0.8) delta += L;
        phases = [
          { delta: delta - H, dur: 1100, ease: Q, fakeLand: true },
          { delta: H, dur: 330, ease: Q, pauseBefore: 500 },
        ];
        break;
      default: // normal
        while (delta < L * 0.8) delta += L;
        phases = [{ delta, dur: 1100, ease: Q }];
    }

    this.mode = "stopping";
    this.anim = {
      phases,
      idx: 0,
      startPos: this.pos,
      t0: performance.now(),
      waitUntil: 0,
      lastTickCell: -1,
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

      // フェイント中の「止まったフリ」待機
      if (a.waitUntil) {
        if (now < a.waitUntil) { this.draw(); return; }
        a.waitUntil = 0;
        a.t0 = now;
      }

      const ph = a.phases[a.idx];
      const t = Math.min(1, (now - a.t0) / ph.dur);
      this.pos = mod(a.startPos + ph.delta * ph.ease(t), L);

      // 減速中のコマ送りチック音
      const cell = Math.floor(this.pos / ITEM_H());
      if (cell !== a.lastTickCell && t > 0.35) { sndTick(); a.lastTickCell = cell; }
      if (t > 0.4) this.strip.classList.remove("blur");

      if (t >= 1) {
        this.pos = mod(a.startPos + ph.delta, L);
        a.startPos = this.pos;
        if (a.idx < a.phases.length - 1) {
          // まだ続きがある＝偽の停止（フェイント）
          if (ph.fakeLand && this.onFakeLand) this.onFakeLand(this);
          a.idx++;
          a.t0 = now;
          const next = a.phases[a.idx];
          if (next.pauseBefore) a.waitUntil = now + next.pauseBefore;
        } else {
          this.mode = "stopped";
          if (this.onLanded) this.onLanded(this);
        }
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
    // 15%でミニフェイント（1コマ手前で止まったフリ→もう1コマ進む）
    const eff = Math.random() < 0.15 ? "minifeint" : "normal";
    reel.onFakeLand = (r) => onReelFakeLand(r, false);
    reel.onLanded = (r) => onReelLanded(r, false);
    reel.planStop(forbidden, eff);
    return;
  }

  // 最終リール：6種の演出から抽選
  const roll = Math.random();
  const effect =
    roll < 0.16 ? "slam" :
    roll < 0.32 ? "jirashi" :
    roll < 0.48 ? "reverse" :
    roll < 0.64 ? "feint" :
    roll < 0.80 ? "backstep" : "rainbow";
  lastEffect = effect;
  reel.el.classList.add("hot");
  startLamps(true);
  reel.onFakeLand = (r) => onReelFakeLand(r, true);
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

/* 偽の停止（フェイント）：本物そっくりの停止演出→直後にもう一度動き出す */
function onReelFakeLand(reel, isLast) {
  playSfx(`stop${(reel.index % 3) + 1}`, .8);
  reel.flash();
  shockwave(reel.el);
  reel.el.classList.remove("landed");
  void reel.el.offsetWidth;
  reel.el.classList.add("landed");
  showCallout(isLast ? "…と見せかけて!?" : "おっと!?");
  // 動き出す瞬間にブラーを戻すと「まだ終わってない」感が出る
  setTimeout(() => {
    if (reel.mode === "stopping") reel.strip.classList.add("blur");
  }, 600);
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
    card.appendChild(elem("p", "tagline", t.desc));

    // 初学者向け解説：どんなツール？
    if (t.easy) {
      const easyBox = elem("div", "easy-box");
      easyBox.appendChild(elem("div", "easy-head", "🔰 どんなツール？"));
      easyBox.appendChild(elem("p", "easy-text", t.easy));
      card.appendChild(easyBox);
    }
    // 初学者向け解説：得意なこと
    if (t.strengths && t.strengths.length) {
      const strBox = elem("div", "easy-box");
      strBox.appendChild(elem("div", "easy-head", "💪 得意なこと"));
      const ul = elem("ul", "strength-list");
      for (const s of t.strengths) ul.appendChild(elem("li", null, s));
      strBox.appendChild(ul);
      card.appendChild(strBox);
    }
    card.appendChild(elem("span", "detail-link", "くわしく見る →"));
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
