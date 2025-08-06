# Extreme Reminder コード読み方ガイド

## 🎯 プロジェクト概要
Extreme Reminderは、macOS向けのシンプルで強力なリマインダーアプリケーションです。
指定時間後に全画面で通知を表示し、ユーザーの注意を確実に引きます。

## 🏗️ アーキテクチャ概要

### 技術スタック
- **フロントエンド**: Vue 3 + TypeScript
- **デスクトップ**: Electron
- **ビルドツール**: Vite + Electron Forge
- **テスト**: Vitest + @vue/test-utils

### プロセス構成
```
┌─────────────────────────────────────┐
│         メインプロセス               │
│        (src/main.ts)                │
│  - ウィンドウ管理                   │
│  - IPC通信ハンドラー                │
└──────────┬──────────────────────────┘
           │
           │ IPC通信
           │
┌──────────┴──────────────────────────┐
│         プリロード                   │
│      (src/preload.ts)               │
│  - セキュアなAPI橋渡し              │
└──────────┬──────────────────────────┘
           │
           │ contextBridge
           │
┌──────────┴──────────────────────────┐
│      レンダラープロセス              │
│     (src/renderer.ts)               │
│  - Vue アプリケーション             │
│  - UI コンポーネント                │
└─────────────────────────────────────┘
```

## 📁 ディレクトリ構造と役割

### `/src` - ソースコード
```
src/
├── main.ts              # Electronメインプロセス（アプリケーション本体）
├── preload.ts           # IPC通信のブリッジ（セキュリティ層）
├── renderer.ts          # Vueアプリのエントリーポイント
├── App.vue              # メインコンポーネント（全体の統括）
├── components/          # UIコンポーネント
│   ├── TimerInput.vue   # タイマー設定UI
│   └── FullScreenNotification.vue # 全画面通知UI
└── services/            # ビジネスロジック
    └── Timer.ts         # タイマー管理クラス
```

## 🔍 コードを読む順序

### 1. エントリーポイントの理解
1. **`src/main.ts`** (約85行)
   - Electronアプリの起動処理
   - メインウィンドウの作成: `createWindow()`関数 (12-38行目)
   - IPC通信ハンドラー: `show-notification`と`hide-notification` (63-85行目)

2. **`src/preload.ts`** (約7行)
   - メインプロセスとレンダラープロセスの橋渡し
   - `window.electron`オブジェクトの公開

3. **`src/renderer.ts`**
   - Vueアプリケーションのマウントポイント

### 2. アプリケーションロジックの理解
1. **`src/App.vue`** (約103行)
   - アプリケーション全体の状態管理
   - タイマーの開始/停止制御: `handleStart()`, `handleStop()` (29-49行目)
   - 通知の表示制御: `handleCloseNotification()` (51-58行目)
   - 残り時間の更新: `startUpdateInterval()` (60-64行目)

2. **`src/services/Timer.ts`** (約50行)
   - タイマーのコアロジック
   - `start()`: タイマー開始 (7-20行目)
   - `getRemainingTime()`: 残り時間計算 (33-42行目)

### 3. UIコンポーネントの理解
1. **`src/components/TimerInput.vue`**
   - ユーザー入力の処理
   - タイマー表示

2. **`src/components/FullScreenNotification.vue`**
   - 全画面通知の表示
   - 通知の閉じる処理

## 🔄 データフローの理解

### タイマー開始時のフロー
```
1. ユーザーが時間を入力
   ↓
2. TimerInput.vue → @start イベント発火
   ↓
3. App.vue → handleStart() 実行
   ↓
4. Timer.ts → start() メソッド呼び出し
   ↓
5. 指定時間後、コールバック実行
   ↓
6. showNotification.value = true
   ↓
7. window.electron.showNotification() 呼び出し
   ↓
8. preload.ts → IPC通信
   ↓
9. main.ts → ウィンドウを全画面表示
```

## 🧪 テストコードの読み方

### テストファイルの場所
```
src/
├── components/__tests__/
│   ├── TimerInput.spec.ts
│   └── FullScreenNotification.spec.ts
└── services/__tests__/
    └── Timer.spec.ts
```

### テスト実行
```bash
npm test           # テスト実行
npm run test:watch # ウォッチモード
npm run test:ui    # UI付きテスト
```

## 🔧 ビルド設定の理解

### 主要な設定ファイル
- `forge.config.ts` - Electron Forgeのビルド設定
- `vite.*.config.mjs` - Viteのビルド設定（main/preload/renderer別）
- `tsconfig.json` - TypeScript設定

### ビルドコマンド
```bash
npm start          # 開発サーバー起動
npm run package    # アプリケーションのパッケージング
npm run make       # インストーラー作成
```

## 💡 開発時のポイント

### 1. IPC通信の追加
新しいIPC通信を追加する場合：
1. `src/main.ts`にハンドラー追加
2. `src/preload.ts`にAPIメソッド追加
3. `src/App.vue`から呼び出し

### 2. 新機能の追加
1. 必要に応じて`services/`にロジッククラス追加
2. `components/`にUIコンポーネント追加
3. `App.vue`で統合

### 3. デバッグ
- 開発モードではDevToolsが自動で開く
- `console.log()`でデバッグ可能
- メインプロセスのログはターミナルに出力

## 📝 コード規約

### 命名規則
- **コンポーネント**: PascalCase (例: `TimerInput.vue`)
- **関数**: camelCase (例: `handleStart()`)
- **定数**: UPPER_SNAKE_CASE（必要に応じて）

### ファイル構成
- 1ファイル1コンポーネント/クラス
- テストファイルは`__tests__`ディレクトリに配置
- ビジネスロジックは`services/`に分離

## 🚀 次のステップ

このガイドを読んだ後は：
1. 実際にコードを動かしてみる（`npm start`）
2. 小さな変更を加えてみる（タイマーのデフォルト値変更など）
3. テストを実行して動作確認（`npm test`）
4. 新機能の追加にチャレンジ

## 📚 参考資料
- [Electron公式ドキュメント](https://www.electronjs.org/docs)
- [Vue 3公式ドキュメント](https://v3.vuejs.org/)
- [Vite公式ドキュメント](https://vitejs.dev/)