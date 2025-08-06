# 作業ログルール

## 概要
このプロジェクトでは、絶対に開発作業を進める際に必ず`.logs`フォルダ内に作業ログをMarkdown形式で記録する。

## ログファイル構成
- 場所: `.logs/`ディレクトリ
- ファイル名: `YYYY-MM-DD_作業内容.md`（例: `2025-08-05_初期セットアップ.md`）

## ログフォーマット
各ログファイルには以下の情報を含める：

1. **ヘッダー情報**
   - 日付
   - 作業概要
   - 作業者（Claude）

2. **作業内容**
   - 実施したタスク
   - 使用したコマンド
   - 作成/変更したファイル
   - テスト結果

3. **課題と解決策**
   - 遭遇した問題
   - 採用した解決策
   - 今後の改善点

4. **次のステップ**
   - 完了したタスク
   - 残タスク
   - 次回の作業予定

## ログ記載のタイミング
- 新しいタスクを開始する前
- 重要な変更を加えた後
- エラーや問題に遭遇した時
- タスクを完了した時

## サンプルログ
```markdown
# 2025-08-05 初期セットアップ

## 作業概要
Extreme Reminderプロジェクトの初期セットアップを実施

## 実施内容
### 1. プロジェクト作成
- コマンド: `npm create electron-app@latest extreme-reminder -- --template=vite-typescript`
- 結果: 成功

### 2. 依存関係のインストール
- Vue 3とテスト環境のセットアップ
- インストールしたパッケージ一覧

## 課題と解決策
- 課題: [記載]
- 解決策: [記載]

## 次のステップ
- [x] プロジェクト作成
- [ ] Vitest設定
- [ ] TDDによる実装開始
```

## プロジェクト構造とアーキテクチャ

### 技術スタック
- **フレームワーク**: Electron + Vue 3 + TypeScript
- **ビルドツール**: Vite
- **テストフレームワーク**: Vitest + @vue/test-utils
- **パッケージマネージャー**: npm

### ディレクトリ構造
```
extreme-reminder/
├── .logs/                      # 作業ログ
│   ├── 2025-08-05_初期セットアップ.md
│   └── 2025-08-05_ビルドとパッケージング.md
├── src/
│   ├── components/            # Vueコンポーネント
│   │   ├── FullScreenNotification.vue
│   │   └── TimerInput.vue
│   ├── services/              # ビジネスロジック
│   │   ├── Timer.ts
│   │   └── __tests__/
│   │       └── Timer.spec.ts
│   ├── App.vue               # メインアプリケーションコンポーネント
│   ├── main.ts               # Electronメインプロセス
│   ├── preload.ts            # IPC通信ブリッジ
│   └── renderer.ts           # Vueアプリケーションエントリーポイント
├── out/                      # ビルド出力
│   └── Extreme Reminder-darwin-arm64/
└── package.json

```

### 主要機能
1. **タイマー機能**: カウントダウンタイマーによるリマインダー設定
2. **全画面通知**: 時間になったら全画面で通知を表示
3. **macOSネイティブアプリ**: Apple Silicon (ARM64)対応

### ビルド済み成果物
- **アプリケーション**: `out/Extreme Reminder-darwin-arm64/Extreme Reminder.app`
- **配布用ZIP**: `out/make/zip/darwin/arm64/Extreme Reminder-darwin-arm64-1.0.0.zip`

### 開発コマンド
```bash
# 開発サーバー起動
npm start

# テスト実行
npm test

# ビルド
npm run package

# インストーラー作成
npm run make
```
