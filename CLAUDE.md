# TC Bühlertal – Projektkontext für Claude Code

## Was ist das?
Homepage des **TC Bühlertal e.V.** (Tennisclub, gegründet 1965, 6 Sandplätze, Schwarzwald).
Gebaut mit **Astro + AstroWind-Template**, Tailwind CSS, TypeScript. Dark-only Theme.

## Tech Stack
- **Astro** (SSG) + AstroWind-Template als Basis
- **Tailwind CSS** für Styling
- **astro-icon** mit Tabler-Icons (`tabler:*`) und flat-color-icons
- Content Collections für strukturierte Inhalte

## Projektstruktur

```
src/
  config.yaml          # Site-Name, Metadaten, Theme-Einstellungen
  navigation.ts        # Header- und Footer-Navigation
  content/
    config.ts          # Zod-Schemas für alle Collections
    matches/           # Spielbetrieb-Einträge (*.md)
    events/            # Termine & Events (*.md)
    posts/             # Berichte/News-Beiträge (*.md)
  pages/
    index.astro        # Startseite
    matches/index.astro
    events/index.astro
    posts/index.astro + [...slug].astro
    club.astro         # Über uns (Platzhalter)
    board.astro        # Vorstand (Platzhalter)
    membership.astro   # Mitgliedschaft
    guest-players.astro
    facility.astro     # Anlage & Anfahrt
    contact.astro
    legal/
      imprint.astro    # Impressum (Platzhalter-Daten zum Ausfüllen)
      privacy.astro    # Datenschutz
  components/
    Logo.astro         # SVG-Logo: grüner Kreis + Tennisball-Kurven + Baum
    common/Gallery.astro
    widgets/           # Hero, Header, Footer, Features, etc.
  layouts/
    PageLayout.astro   # Standard-Layout mit Header + Footer
```

## Content Collections – Schemas

### matches
```yaml
team: "Herren 1"
matchDate: 2026-05-10
homeAway: home          # oder: away
opponent: "TC Beispiel"
location: "Tennisanlage"
competition: "Sommer 2026"
detailsUrl: "https://..."   # optional, NICHT 'link:'
result: "6:3"               # optional
draft: false
```

### events
```yaml
title: "Sommerfest"
startDate: 2026-07-12
endDate: 2026-07-12         # optional
time: "14:00"               # optional
location: "Clubhaus"        # optional
description: "..."          # optional
draft: false
```

### posts
```yaml
title: "Spielbericht"
date: 2026-06-15
excerpt: "Kurzbeschreibung"
tags: ["spiel", "herren1"]
meta:                        # optional, Key-Value-Paare
  - label: "Team"
    value: "Herren 1"
gallery:                     # Bilder aus /public/images/posts/...
  - src: "/images/posts/ordner/datei.jpg"
    caption: "Bildunterschrift"
draft: false
```

## Bilder
- **Hero-/Seiten-Bilder**: `src/assets/images/` (Astro-optimiert, relative Imports)
- **Post-Galerie-Bilder**: `public/images/posts/[name]/` → Pfad: `/images/posts/[name]/datei.jpg`
- **Gallery-Schema** nutzt `z.string()` (nicht `image()`), weil public-Pfade verwendet werden
- `coverImage` in posts-Schema nutzt noch `image()` – bei Bedarf auf `z.string()` umstellen

## Wichtige Konventionen
- Layouts: Alle Seiten nutzen `~/layouts/PageLayout.astro` (nicht rohes HTML)
- Dark-Mode: `dark:only` – kein Toggle, kein Light-Mode
- Sprache: Deutsch, Du-Form für Mitglieder-Ansprache, Sie-Form für Gastspieler
- Kontakt-E-Mail: `tcbuehlertal@web.de`
- Icons: `tabler:*` über `import { Icon } from 'astro-icon/components'`
- Tailwind-Klassen: `bg-light`/`bg-dark`/`text-page`/`text-muted` sind Custom-Tokens

## Offene TODOs (Phase 3)
- `/matches/[slug].astro` – Einzelmatch-Detailseite (verlinkt, aber noch nicht vorhanden)
- `club.astro` und `board.astro` – Inhalte noch leer ("Inhalt folgt")
- `legal/imprint.astro` – echte Vereinsdaten eintragen (Vorsitzender, Registergericht)
- `facility.astro` – genaue Adresse (Straße, PLZ) und Google-Maps-Link aktualisieren
- Posts/Berichte in die Navigation aufnehmen
- `about.astro` löschen (wird nicht verwendet, Navigation nutzt `/club`)
