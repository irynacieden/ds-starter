# Workshop demo — план Figma (синхронний з кодом)

> **Призначення.** Єдине джерело для фабрикації Figma-файлу «DS Workshop Demo» так, щоб він дзеркалив токени/компоненти цього репо. Виконує сесія, **залогінена у Figma під робочим (Cieden) акаунтом**. Код — джерело істини для значень; цей файл лише пояснює, як перенести їх у Figma.
>
> **Передумова (обовʼязково).** Перед фабрикацією — `whoami`. Якщо віддає особистий Starter/View-акаунт → СТОП: впремось у ліміт викликів MCP + гейт мульти-режимних Variables. Переавторизувати конектор: Claude Code → `/mcp` → Figma → Disconnect → Connect → у OAuth обрати робочий акаунт.

---

## 1 · Мета й аудиторія

Show-and-tell для дизайнерів-початківців (Claude + Cursor). Файл спроєктований **під питання команди**:

| Питання | Що в демо відповідає |
|---|---|
| Андрій: «як створити / редагувати DS» | Variables (токени) + компоненти з варіантами |
| Андрій: «чи зміни йдуть на **ВСІ** екрани» (головне) | 2 екрани на спільних токенах/компонентах → token-swap у коді оновлює **обидва** |
| Андрій: «будувати продукт з DS» | composed-екран зі складених компонентів |
| Андрій: «де зберігати / історія змін» | repo (`ds-starter`) + git — показуємо в коді, не у Figma |
| Настя: «порядок кроків + що скіпнути» | three-phase + явний список «не будуємо» (anti-overbuild) |

---

## 2 · Token system (джерело істини = `packages/tokens/src/tokens.css`)

**Палітра:** pure neutral, primary = off-black ↔ off-white (інверсія), soft-статуси, шрифт Geist. Усі значення — нижче; у Figma вони мають збігтися 1:1.

### Рівень 1 — нейтральні примітиви (константи, без режимів)

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| `gray-50` | `#fafafa` | | `gray-500` | `#737373` |
| `gray-100` | `#f5f5f5` | | `gray-600` | `#525252` |
| `gray-200` | `#e5e5e5` | | `gray-700` | `#404040` |
| `gray-300` | `#d4d4d4` | | `gray-800` | `#262626` |
| `gray-400` | `#a3a3a3` | | `gray-900` | `#171717` |
| | | | `gray-950` | `#0a0a0a` |

### Рівень 2 — семантика (режими Light / Dark)

| Семантичний | Light | Dark |
|---|---|---|
| `background` | `#ffffff` | `gray-950` |
| `foreground` | `gray-950` | `gray-50` |
| `card` | `#ffffff` | `gray-900` |
| `card-foreground` | `gray-950` | `gray-50` |
| `muted` | `gray-100` | `gray-800` |
| `muted-foreground` | `gray-500` | `gray-400` |
| `border` | `gray-200` | `gray-800` |
| `input` | `gray-200` | `gray-800` |
| `ring` | `gray-950` | `gray-300` |
| `primary` | `gray-950` (off-black) | `gray-50` (off-white) |
| `primary-foreground` | `gray-50` | `gray-950` |
| `secondary` | `gray-100` | `gray-800` |
| `secondary-foreground` | `gray-900` | `gray-50` |
| `radius` | `0.5rem` | `0.5rem` |

### Статуси — soft (тінт-фон + насичений текст), AA-контраст

| Статус | Light surface / text | Dark surface / text |
|---|---|---|
| `success` | `#f0fdf4` / `#15803d` | `#0c2818` / `#4ade80` |
| `warning` | `#fffbeb` / `#b45309` | `#2a1d05` / `#fbbf24` |
| `destructive` | `#fef2f2` / `#b91c1c` | `#2d1314` / `#f87171` |
| `info` | `#eff6ff` / `#1d4ed8` | `#0e1d38` / `#60a5fa` |

Stock-status мапиться: **In stock → success · Low → warning · Out → destructive**.

### Як лягає у Figma Variables

- **Колекція «Primitives»** — один режим. Тільки `gray-50…950`.
- **Колекція «Semantic»** — **два режими: Light + Dark**. Нейтрали — **аліаси** на `Primitives/gray-*` (це і є teaching-момент: семантика посилається на примітиви). Статусні surface/foreground — прямі hex по режимах (таблиця вище).
- **Scopes** (не лишай `ALL_SCOPES`): фони (`background/card/*-surface`) → `FRAME_FILL, SHAPE_FILL`; тексти (`foreground/*-foreground`) → `TEXT_FILL`; `border/input/ring` → `STROKE_COLOR`; `radius` → `CORNER_RADIUS`.
- ⚠️ Перевір, що MCP створив саме **Variables** (а не лише color styles), і що режимів **два**.

### Шрифти

`Geist` (sans) + `Geist Mono`. У коді — `@fontsource-variable/geist` (родини «Geist Variable» / «Geist Mono Variable»). У Figma — текстові стилі на Geist (heading / body / mono).

### Брейкпоінти

Дефолти Tailwind 4: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`. У Figma фрейми екранів роби під desktop ~1280, мінімум — list-екран адаптивний до ~768.

---

## 3 · Структура Figma-файлу «DS Workshop Demo»

Будуємо **backward від сторінки** (не каталог компонентів). Сторінки файлу:

**A. Tokens** — Variables (вище) + невелика дошка-свотчі (шкала сірого, семантика, бейджі) для наочності.

**B. Components** — те, що потрібні екранам, з варіантами/станами:
- **Button** — variant `solid` / `outline`; стани default / hover / focus / disabled.
- **Input** (search) — default / focus.
- **Badge** (stock-status, soft) — `success` / `warning` / `destructive` / `info`.
- **Card** (stat) — стани default / loading(skeleton) / empty / error.
- **Table / List-row** — клітинки Name · Category · Price · Stock-badge · ⋯-дія.
- **Empty state**.
- Page header — мінімальний. **БЕЗ Avatar.**

**C. Screens** — два екрани на ТИХ САМИХ компонентах/токенах:
- **Екран 1 — Products list:** Header «Products» + `[Add product]` · 3 stat-картки (Total / Low stock / Out of stock) · toolbar search · таблиця (Name · Category · Price · Stock-badge · ⋯) · стани loading(skeleton) / empty / error.
- **Екран 2 — Product detail (мінімальний, ДЛЯ PROPAGATION):** Card з name + Stock-badge + price + `[Edit]` + 2 stat-картки. Reuse тих самих компонентів/токенів → swap токена оновлює **обидва** екрани.

**D. Готові приклади** (кладемо у файл як демонстрацію, **у коді зараз не будуємо**): Checkbox/Switch, Select, Tabs, Alert, Avatar, Modal/Drawer.

**E. НЕ чіпаємо** (teaching-урок anti-overbuild): date-picker, charts, складні таблиці.

---

## 4 · Live-demo зріз (scope на самій сесії)

Файл повний, але **наживо** демонструємо ОДИН наскрізний зріз, щоб уложитись у час:

- **Токени + Button (усі стани)** наскрізь: Figma → audit → A/B/C → build → Storybook → parity → token-swap.
- **Card + Page** показуємо як **готовий результат** (із fallback-гілки), не будуємо наживо.

## 5 · Propagation-доказ (серце воркшопу)

У `tokens.css` міняємо **один семантичний токен** → Storybook оновлює **обидва екрани** одразу (бо вони *імпортують* компоненти, не копіюють).

- Найпростіший swap: статусний відтінок (напр. `--warning-foreground`) або `--radius`.
- **Опція «новий токен» (за бажанням Iryna):** додати один акцентний токен (напр. `--accent` для лінків/focus) спершу у Figma, потім перенести в код наживо — це робить «перенесення нового токена» справжнім, не дублем. Значення обрати на dry-run. Не ламає нейтральну палітру (один акцент на інтерактив).

---

## 6 · Чеклист фабрикації (сесія під Cieden-акаунтом)

1. `whoami` → підтвердити робочий org-акаунт (не особистий Starter). Інакше `/mcp` re-auth.
2. Створити файл (або взяти наявний у Cieden) → `Primitives` + `Semantic` (Light/Dark) Variables по таблицях вище. Перевірити: два режими, scopes задані, це Variables.
3. Текстові стилі Geist.
4. Components (B) з варіантами/станами, кольори **тільки** з Variables.
5. Screens (C) — два екрани з інстансів.
6. Готові приклади (D); НЕ будувати (E).
7. Звірити з кодом: значення токенів 1:1 з `packages/tokens/src/tokens.css`.
8. Fallback-гілка в репо з готовим результатом (страховка live).
9. Повний dry-run end-to-end + замір часу (>~20 хв → ріж обсяг).

---

*Палітра й рішення вже реалізовані в коді: `packages/tokens/src/tokens.css`, `packages/ui/src/components/`. Контекст воркшопу — `handbook/part-ii-playbook/80-workshops/84-show-and-tell-session.md` (run-sheet) у репо `personal-portfolio`.*
