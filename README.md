# TC Bühlertal – Vereinshomepage

[![CI / Deploy](https://github.com/mkellermeier/tcb/actions/workflows/actions.yaml/badge.svg)](https://github.com/mkellermeier/tcb/actions/workflows/actions.yaml)
[![Astro](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Offizielle Website des **TC Bühlertal e.V.** – Tennisverein seit 1965 im Herzen des Schwarzwalds.

**Live:** [tcbuehlertal.de](https://tcbuehlertal.de)

---

## Features

- **Spielbetrieb** – Spielplan, Ergebnisse und Match-Detailseiten mit Einzel-/Doppelergebnissen und Spielberichten
- **News & Berichte** – Beiträge mit Bildergalerie
- **Termine** – Veranstaltungen und Vereinstermine
- **Vereinsseiten** – Mitgliedschaft, Gastspieler, Anlage & Anfahrt, Sponsoren, Kontakt
- **Dark-only Design**, responsiv, auf Basis von Tailwind CSS
- **SEO** – strukturierte Daten (SportsClub), Sitemap, Open-Graph-Vorschaubilder

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
  images/matches/      # Bilder zu Spielberichten
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

Das Deployment läuft automatisch über GitHub Actions (`.github/workflows/actions.yaml`):

1. **Check** – `npm run check` (Astro-Typen, ESLint, Prettier)
2. **Deploy** – Build und Veröffentlichung auf GitHub Pages (`actions/deploy-pages`)

Der Workflow läuft bei jedem Push auf `main`, bei Pull Requests (nur **Check**) sowie täglich um 03:00 Uhr und manuell über `workflow_dispatch`. Die Domain wird über die `CNAME`-Datei in `public/` gesetzt.

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

Datei unter `src/content/matches/YYYY-MM-DD-team-gegner.md`. Der Markdown-Body
der Datei ist der **Spielbericht**, der auf der Match-Detailseite angezeigt wird.

```yaml
---
team: 'Herren 1'
matchDate: 2026-05-10
homeAway: home # oder: away
opponent: 'TC Beispiel'
location: 'Tennisanlage' # optional
competition: 'Sommer 2026'
detailsUrl: 'https://baden.liga.nu/...' # optional, Verbandsseite
result: '6:3' # optional, solange nicht gespielt
matchResults: # optional, Einzel-/Doppelergebnisse
  - position: 'E1'
    tcbPlayer: 'Nachname, Vorname'
    opponent: 'Nachname, Vorname'
    score: '6:3, 6:2'
    won: true
coverImage: '/images/matches/YYYY-MM-DD-team-gegner/01.jpg' # optional
gallery: # optional
  - src: '/images/matches/YYYY-MM-DD-team-gegner/01.jpg'
  - src: '/images/matches/YYYY-MM-DD-team-gegner/02.jpg'
draft: false
---
## Überschrift des Spielberichts

Fließtext des Spielberichts ...
```

Bilder gehören nach `public/images/matches/[slug]/` (Benennung: `01.jpg`, `02.jpg`, ...).
