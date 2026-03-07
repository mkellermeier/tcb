# TC Bühlertal – Vereinshomepage

Offizielle Website des **TC Bühlertal e.V.** – Tennisverein seit 1965 im Herzen des Schwarzwalds.

**Live:** [tcbuehlertal.de](https://tcbuehlertal.de)

---

## Tech Stack

- [Astro](https://astro.build/) (SSG) auf Basis des [AstroWind](https://github.com/onwidget/astrowind)-Templates
- [Tailwind CSS](https://tailwindcss.com/) – Dark-only Theme
- [TypeScript](https://www.typescriptlang.org/)
- Content Collections (Markdown) für Posts, Events und Spielbetrieb

## Projektstruktur

```
src/
  config.yaml          # Site-Name, Metadaten, Theme
  navigation.ts        # Header- und Footer-Navigation
  content/
    posts/             # Berichte & Neuigkeiten (*.md)
    events/            # Termine & Events (*.md)
    matches/           # Spielbetrieb (*.md)
  pages/               # Alle Seiten (.astro)
  components/          # Wiederverwendbare Komponenten
  assets/images/       # Optimierte Assets (Hero-Bilder etc.)
public/
  images/posts/        # Galeriebilder der Beiträge
  images/sponsors/     # Sponsor-Logos
  documents/           # Vereinsdokumente (z.B. Aufnahmeantrag)
```

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Die Seite ist dann unter `http://localhost:4321` erreichbar.

## Verfügbare Scripts

| Script            | Beschreibung                        |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Entwicklungsserver starten          |
| `npm run build`   | Produktions-Build erstellen         |
| `npm run preview` | Build lokal vorschauen              |
| `npm run check`   | Astro-Check + ESLint + Prettier     |
| `npm run fix`     | ESLint + Prettier automatisch fixen |

## Deployment

Bei jedem Push auf `main` läuft automatisch via GitHub Actions:

1. **Check** – Astro-Typen, ESLint, Prettier
2. **Deploy** – Build + FTP-Upload auf Hostinger

Secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_REMOTE_DIR`) sind als GitHub Repository Secrets hinterlegt.

## Content pflegen

### Neuen Beitrag erstellen

Datei unter `src/content/posts/YYYY-MM-DD-titel.md` anlegen:

```yaml
---
title: 'Titel des Beitrags'
date: 2026-06-15
excerpt: 'Kurze Beschreibung'
tags: ['herren1', 'medenrunde']
coverImage: '/images/posts/YYYY-MM-DD-titel/01.jpg'
gallery:
  - src: '/images/posts/YYYY-MM-DD-titel/01.jpg'
  - src: '/images/posts/YYYY-MM-DD-titel/02.jpg'
draft: false
---
Inhalt des Beitrags...
```

Bilder gehören nach `public/images/posts/[slug]/` (Benennung: `01.jpg`, `02.jpg`, ...).

### Neuen Termin erstellen

Datei unter `src/content/events/YYYY-MM-DD-titel.md`:

```yaml
---
title: 'Sommerfest'
startDate: 2026-07-12
time: '14:00'
location: 'Clubhaus'
description: 'Kurzbeschreibung'
draft: false
---
```

### Spielergebnis eintragen

Datei unter `src/content/matches/`:

```yaml
---
team: 'Herren 1'
matchDate: 2026-05-10
homeAway: home
opponent: 'TC Beispiel'
competition: 'Sommer 2026'
result: '6:3'
draft: false
---
```
