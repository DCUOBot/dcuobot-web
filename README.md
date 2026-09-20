# dcuobot-web

[![CI](https://github.com/DCUOBot/dcuobot-web/actions/workflows/ci.yml/badge.svg)](https://github.com/DCUOBot/dcuobot-web/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=DCUOBot_dcuobot-web&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=DCUOBot_dcuobot-web)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

React frontend for **DCUOBot**. It lets you look up
[DC Universe Online](https://www.dcuniverseonline.com/) characters and
leagues, browse rankings, check server status, and read up on the Discord
bot's commands — all backed by the
[dcuobot-api](https://github.com/DCUOBot/dcuobot-api) service.

## Features

- **Character & league lookup** — search by name and server, with detailed
  stats, artifacts, allies and league membership.
- **Rankings** — sortable, paginated leaderboards for both characters and
  leagues, filterable by server.
- **Server status** — live population/status for every DCUO game server.
- **Commands reference** — a browsable list of the bot's Discord slash
  commands.
- **Bot invite** — a direct link to add the DCUOBot Discord bot to a server.
- **Localization** — English and German, with per-feature translations
  loaded on demand.
- **Light/dark/system theming.**
- **Privacy policy page**, since the site and bot both process user data.

## Tech stack

- React 19, TypeScript, Vite
- TanStack Router, TanStack Query, TanStack Table
- Tailwind CSS 4, react-aria-components (via a small shadcn-derived
  component layer)
- i18next / react-i18next
- Vitest, Testing Library

## Pages

| Page              | Path                  | Description                                       |
| ----------------- | --------------------- | ------------------------------------------------- |
| Home              | `/`                   | Overview and bot invite                           |
| Character details | `/characters`         | Character lookup, by name + server (query params) |
| Character ranking | `/characters/ranking` | Sortable character leaderboard                    |
| League details    | `/leagues`            | League lookup, by name + server (query params)    |
| League ranking    | `/leagues/ranking`    | Sortable league leaderboard                       |
| Server status     | `/server-status`      | Live DCUO game server status                      |
| Commands          | `/commands`           | Discord bot command reference                     |
| Privacy           | `/privacy`            | Privacy policy                                    |

## Getting started

```
git clone https://github.com/DCUOBot/dcuobot-web.git
cp .env.example .env   # optional, only needed to point at a non-production API
npm install
npm run dev
```

By default the app talks to the production DCUOBot API
(`https://dcuo.bot/api/v1/census`). To develop against a local
[dcuobot-api](https://github.com/DCUOBot/dcuobot-api) instance instead, set
`VITE_API_BASE_URL` in `.env` — see [CONTRIBUTING.md](CONTRIBUTING.md) for
the full dev setup.

### Requirements

- Node.js **24+**

### Configuration

Set via environment variables (see `.env.example`):

| Variable            | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | Base URL of the DCUOBot census API. Optional — defaults to production. |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
