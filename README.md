# ds-starter

Чистий стартовий monorepo для дизайн-системи: **tokens → ui → storybook**, на **shadcn/ui-стилі + Tailwind 4**. Призначення подвійне: (1) база нового проєкту, (2) шаблон, який команда копіює собі.

> Філософія й «чому саме так» — у handbook: `manual/00-index.md` (Operating Manual) + `10-repo-setup/15-stack-choice-and-setup-simplification.md`.

## Структура

```
packages/
  tokens/      @repo/tokens — семантичні CSS-змінні (єдине джерело значень)
  ui/          @repo/ui     — компоненти (Badge, Button…) у shadcn-стилі (cva + cn)
apps/
  storybook/   @repo/storybook — Storybook 8 + Tailwind 4 + a11y + theme toggle
```

Шари: **токени** (значення) → **ui** (компоненти, що вживають токени через класи `bg-success`) → **storybook** (середовище, де видно все). Tailwind-тему збирає застосунок (storybook); компоненти лишаються чистими.

## Швидкий старт

```bash
corepack enable pnpm        # один раз: вмикає pnpm через node
pnpm install
pnpm storybook              # → http://localhost:6006
```

Інші команди:

```bash
pnpm typecheck       # TS strict по всіх пакетах
pnpm lint            # ESLint (+ jsx-a11y, react-hooks)
pnpm build-storybook # статична збірка (як у CI)
```

## Демо «поширення» (для воркшопу)

Відкрий `packages/tokens/src/tokens.css`, зміни один семантичний токен (напр. `--warning-foreground` або `--radius`) → онови Storybook. **Усі** інстанси змінились одразу — бо вони вживають токен, а не хардкод. Один правок → скрізь.

> Повний план демо + як перенести ці токени у Figma Variables (Light/Dark) — `docs/workshop-figma-plan.md`.

## Як додати компонент

Workflow Figma → код (three-phase): `handbook/.../30-three-phase-method.md`, демо-скрипт: `80-workshops/84-show-and-tell-session.md`.

Коротко: новий файл у `packages/ui/src/components/`, варіанти через `cva`, кольори **тільки** з токенів (`bg-*`), експорт у `src/index.ts`, story у `apps/storybook/stories/`. Опційно — shadcn CLI (`components.json` готовий), але компоненти працюють і без нього.

## Перевірки (checks)

- **TS strict** (per package) · **ESLint** (typescript + react-hooks + jsx-a11y) · **Storybook a11y addon** (`a11y.test: error`).
- **CI** (`.github/workflows/ci.yml`): install → typecheck → lint → build-storybook.
- `dist`/`node_modules`/`storybook-static` — у `.gitignore` (артефакти не комітимо).

Свідомо **без** 700 рядків bash-перевірок зі старого проєкту — turborepo + ESLint + TS покривають те саме простіше.

## Як використати як шаблон

1. Скопіюй теку (або «Use this template», якщо буде на GitHub).
2. Переймень `name` у root `package.json`.
3. `corepack enable pnpm && pnpm install`.
4. Заміни sample-компоненти на свої; постав свої токени у `packages/tokens`.

## Стек

pnpm workspaces · turborepo · TypeScript (strict) · React 19 · Tailwind CSS 4 · shadcn-стиль (cva + clsx + tailwind-merge) · Storybook 8 (react-vite) · ESLint 9 (flat).
