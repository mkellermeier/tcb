import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Start', href: getPermalink('/') },
    { text: 'Spielbetrieb', href: getPermalink('/matches') },
    { text: 'Events', href: getPermalink('/events') },
    { text: 'Gastspieler', href: getPermalink('/guest-players') },
    { text: 'Berichte', href: getPermalink('/posts') },
    {
      text: 'Verein',
      links: [
        { text: 'Über uns', href: getPermalink('/club') },
        { text: 'Vorstand', href: getPermalink('/board') },
        { text: 'Mitgliedschaft', href: getPermalink('/membership') },
        { text: 'Anlage & Anfahrt', href: getPermalink('/facility') },
        { text: 'Clubshop ↗', href: 'https://www.11teamsports.com/de-de/clubshop/tc-buehlertal-e-v/' },
      ],
    },
    { text: 'Kontakt', href: getPermalink('/contact') },
  ],
  actions: [{ text: 'Mitglied werden', href: getPermalink('/membership') }],
};

export const footerData = {
  links: [
    {
      title: 'TC Bühlertal',
      links: [
        { text: 'Verein', href: getPermalink('/club') },
        { text: 'Vorstand', href: getPermalink('/board') },
        { text: 'Kontakt', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'Sport',
      links: [
        { text: 'Spielbetrieb', href: getPermalink('/matches') },
        { text: 'Events', href: getPermalink('/events') },
        { text: 'Berichte', href: getPermalink('/posts') },
        { text: 'Gastspieler', href: getPermalink('/guest-players') },
        { text: 'Clubshop ↗', href: 'https://www.11teamsports.com/de-de/clubshop/tc-buehlertal-e-v/' },
      ],
    },
    {
      title: 'Rechtliches',
      links: [
        { text: 'Impressum', href: getPermalink('/legal/imprint') },
        { text: 'Datenschutz', href: getPermalink('/legal/privacy') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Impressum', href: getPermalink('/legal/imprint') },
    { text: 'Datenschutz', href: getPermalink('/legal/privacy') },
  ],
  socialLinks: [
    {
      ariaLabel: 'Instagram',
      icon: 'tabler:brand-instagram',
      href: 'https://www.instagram.com/tcbuehlertal/',
    },
  ],
  footNote: `© ${new Date().getFullYear()} TC Bühlertal e.V. - Alle Rechte vorbehalten.`,
};
