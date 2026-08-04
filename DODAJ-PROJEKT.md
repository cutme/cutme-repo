# Jak dodać nowy projekt do portfolio

Projekt używa **jednego źródła danych** — zmiany w jednym miejscu propagują się automatycznie do:
- interaktywnego portfolio (Vue + drawer),
- statycznego HTML generowanego przez EJS (SEO na stronie głównej),
- osobnych stron projektów (`/portfolio/<slug>/` i `/en/portfolio/<slug>/`),
- sitemap.xml.

---

## Krok po kroku

### 1. Dodaj wpis do `src/data/projects.json`

Otwórz `src/data/projects.json` i dodaj nowy obiekt na końcu tablicy (lub w wybranym miejscu — kolejność decyduje o kolejności wyświetlania).

```json
{
  "id": "nazwa-id",
  "slug": "slug-w-url",
  "client": "Nazwa klienta",
  "title": "Tytuł projektu",
  "shortDesc": {
    "pl": "<strong>Krótki opis po polsku</strong> widoczny przy hover na karcie.",
    "en": "<strong>Short description in English</strong> visible on card hover."
  },
  "imageAlt": {
    "pl": "Opis obrazu po polsku dla screen readerów i SEO",
    "en": "Image description in English for screen readers and SEO"
  },
  "image":   "/img/portfolio/nazwa.webp",
  "image2x": "/img/portfolio/nazwa@2x.webp",
  "url": "https://adres-live-strony.pl/",
  "skills": [
    "HTML/CSS",
    "JavaScript",
    "WordPress",
    "Pixel Perfect"
  ],
  "drawerSide": "right"
}
```

**Uwagi do pól:**

| Pole | Opis |
|---|---|
| `id` | Unikalne ID — używane wewnętrznie, musi być unikalne w całym pliku. Tylko małe litery, cyfry, myślniki i podkreślenia. |
| `slug` | Fragment URL strony projektu: `/portfolio/<slug>/`. Używaj tylko małych liter, cyfr i myślników. Nie używaj polskich znaków — zamiast `ę` pisz `e`, zamiast `ó` pisz `o` itp. |
| `client` | Opcjonalne. Jeśli brak — pole można pominąć lub ustawić `null`. |
| `shortDesc` | Krótki opis HTML (można używać `<strong>`, `<em>`) — widoczny przy hover na karcie portfolio. Nie przekraczaj ~160 znaków po usunięciu tagów (używane jako meta description). |
| `imageAlt` | Tekst alternatywny obrazu — ważny dla SEO i dostępności. Opisuj zawartość screenshota strony. |
| `image` / `image2x` | Ścieżki do obrazów od roota projektu. Format webp zalecany. `image2x` opcjonalne (retina). |
| `url` | Adres live strony klienta — link "Zobacz online" w drawerze i na stronie projektu. |
| `skills` | Tablica technologii — wyświetlana jako tagi na karcie i stronie projektu. |
| `video` | Opcjonalne. Ścieżka do pliku MP4 wyświetlanego w hero drawera zamiast obrazka. Np. `"/videos/projekt.mp4"`. Jeśli `null` lub pominięte — wyświetlany jest obrazek. Wideo działa tylko w trybie runtime (Vue), statyczne strony SEO zawsze pokazują `<img>`. |
| `drawerSide` | `"left"` lub `"right"` — z której strony wysuwa się drawer. |

---

### 2. Dodaj obrazy projektu

Wrzuć obrazy do `src/img/portfolio/`:

```
src/img/portfolio/nazwa.webp        ← wersja 1x (ok. 800×480 px)
src/img/portfolio/nazwa@2x.webp     ← wersja 2x retina (ok. 1600×960 px)
```

**Zalecenia:**
- Format: `.webp` (najlepsza kompresja)
- Proporcje: 5:3 (np. 800×480)
- Waga: 1x max ~100 kB, 2x max ~250 kB
- Konwertuj z narzędzi: [Squoosh](https://squoosh.app/), cwebp, ImageMagick

---

### 3. Utwórz komponent Vue (PL)

Utwórz plik `src/vue-portfolio/components/projects/ProjectNazwa.vue`.

Nazwa pliku: `Project` + id projektu z wielką pierwszą literą. Np. dla `id: "nowy-projekt"` → `ProjectNowyProjekt.vue`.

```vue
<template>
  <article class="pd">
    <div class="pd__hero">
      <img
        :src="project.image"
        :srcset="
          project.image2x
            ? `${project.image} 1x, ${project.image2x} 2x`
            : undefined
        "
        :alt="project.imageAlt"
        loading="lazy"
        width="800"
        height="480"
      >
    </div>
    <div v-if="project.skills?.length" class="pd__skills">
      <span v-for="skill in project.skills" :key="skill" class="skill">{{
        skill
      }}</span>
    </div>

    <header class="pd__header">
      <h2>Tytuł projektu</h2>
      <h3>Krótkie motto lub specjalizacja wykonanej pracy.</h3>
    </header>

    <section class="pd__section" v-nowidows>
      <p>
        Opis kontekstu projektu — czego dotyczył, kto był klientem,
        jaki był cel realizacji.
      </p>
      <p>
        Wymagania techniczne lub projektowe, wyzwania z jakimi się zmierzono.
      </p>
    </section>

    <section class="pd__section">
      <h4>Moja rola</h4>
      <ul class="pd__ticks">
        <li>Kodowanie front-end – Pixel Perfect odwzorowanie grafiki</li>
        <li>Wdrożenie szablonu WordPress (ACF, Custom Post Types)</li>
        <li>Responsywność na wszystkich urządzeniach</li>
        <li>Optymalizacja pod SEO i dostępność (WCAG 2.1)</li>
      </ul>
    </section>

    <section class="pd__section" v-nowidows>
      <h4>Efekt</h4>
      <p>
        Opis rezultatu — co powstało, jak działa, jakie ma cechy.
      </p>
    </section>

    <footer class="pd__footer">
      <a
        :href="project.url"
        class="button pd__see-more"
        target="_blank"
        rel="noopener noreferrer"
      >
        Zobacz online
      </a>
      <button type="button" class="pd__close-btn" @click="$emit('close')">
        Zamknij
      </button>
    </footer>
  </article>
</template>

<script setup>
defineProps({ project: { type: Object, required: true } });
defineEmits(["close"]);
</script>

<style scoped>
@import "../ProjectDetail.css";
</style>
```

---

### 4. Utwórz komponent Vue (EN)

Utwórz `src/vue-portfolio/components/projects/en/ProjectNazwaEn.vue`.

Treść identyczna jak PL, ale po angielsku. Zmień też tekst przycisków:
- `Zobacz online` → `View live`
- `Zamknij` → `Close`

---

### 5. Zarejestruj projekt w `src/vue-portfolio/projects.js`

Otwórz plik i dodaj wpisy do **obu** map komponentów.

**`componentMap` (PL) — ok. linia 18:**
```js
'nazwa-id': () => import('./components/projects/ProjectNazwa.vue'),
```

**`componentMapEn` (EN) — ok. linia 35:**
```js
'nazwa-id': () => import('./components/projects/en/ProjectNazwaEn.vue'),
```

---

### 6. Zarejestruj projekt w `scripts/extract-vue-content.js`

Otwórz plik i dodaj wpis do obiektu `projectVueMap`:

```js
'nazwa-id': { pl: 'ProjectNazwa.vue', en: 'en/ProjectNazwaEn.vue' },
```

To pozwala skryptowi wyekstrahować treść z Vue do statycznego HTML.

---

### 7. Zaktualizuj `src/sitemap.xml`

Dodaj dwa bloki URL (PL i EN) na końcu pliku, przed `</urlset>`:

```xml
<!-- Tytuł projektu -->
<url>
  <loc>https://cutme.pl/portfolio/slug-w-url/</loc>
  <lastmod>RRRR-MM-DD</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.7</priority>
  <xhtml:link rel="alternate" hreflang="pl"        href="https://cutme.pl/portfolio/slug-w-url/"/>
  <xhtml:link rel="alternate" hreflang="en"        href="https://cutme.pl/en/portfolio/slug-w-url/"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://cutme.pl/portfolio/slug-w-url/"/>
</url>
<url>
  <loc>https://cutme.pl/en/portfolio/slug-w-url/</loc>
  <lastmod>RRRR-MM-DD</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.6</priority>
  <xhtml:link rel="alternate" hreflang="pl"        href="https://cutme.pl/portfolio/slug-w-url/"/>
  <xhtml:link rel="alternate" hreflang="en"        href="https://cutme.pl/en/portfolio/slug-w-url/"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://cutme.pl/portfolio/slug-w-url/"/>
</url>
```

---

### 8. Uruchom build

```bash
npm run build
```

Build automatycznie:
- wyekstrahuje treść z plików Vue (`scripts/extract-vue-content.js`),
- wygeneruje strony projektu (`scripts/generate-project-pages.js`):
  - `dist/portfolio/slug-w-url/index.html`
  - `dist/en/portfolio/slug-w-url/index.html`
- doda projekt do statycznego HTML strony głównej (EJS),
- skopiuje `.htaccess`, `robots.txt`, `sitemap.xml` do `dist/`.

---

## Checklist

```
[ ] Dodano wpis do src/data/projects.json
[ ] Dodano obraz(y) do src/img/portfolio/
[ ] Utworzono src/vue-portfolio/components/projects/ProjectNazwa.vue (PL)
[ ] Utworzono src/vue-portfolio/components/projects/en/ProjectNazwaEn.vue (EN)
[ ] Zarejestrowano w src/vue-portfolio/projects.js (componentMap + componentMapEn)
[ ] Zarejestrowano w scripts/extract-vue-content.js (projectVueMap)
[ ] Zaktualizowano src/sitemap.xml (2 nowe bloki URL)
[ ] npm run build — build przeszedł bez błędów
[ ] Sprawdzono dist/portfolio/<slug>/index.html — treść jest widoczna
[ ] Sprawdzono dist/en/portfolio/<slug>/index.html — wersja EN jest poprawna
```

---

## Struktura plików projektu

```
src/
├── data/
│   ├── projects.json                ← JEDYNE źródło danych (ID, tytuły, opisy, obrazy)
│   └── projects-seo-content.json   ← generowany automatycznie, nie edytuj ręcznie
├── img/portfolio/
│   ├── nazwa.webp                   ← obraz 1x
│   └── nazwa@2x.webp               ← obraz 2x (retina)
├── vue-portfolio/
│   ├── projects.js                  ← rejestr komponentów Vue
│   └── components/projects/
│       ├── ProjectNazwa.vue         ← opis projektu PL (drawer + SEO)
│       └── en/
│           └── ProjectNazwaEn.vue   ← opis projektu EN (drawer + SEO)
├── sitemap.xml                      ← ręcznie aktualizowana lista URL
scripts/
└── extract-vue-content.js           ← rejestr plików Vue → mapa id: plik
```
