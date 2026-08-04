/**
 * generate-project-pages.js
 *
 * Generuje statyczne pliki HTML (entry points) dla każdego projektu:
 *   src/portfolio/<slug>/index.html       (PL)
 *   src/en/portfolio/<slug>/index.html    (EN)
 *
 * Pliki są tworzone przed buildem Vite i dodawane dynamicznie do rollupOptions.input.
 * Dane pochodzą z jednego źródła: projects.json + pliki Vue (przez extract-vue-content).
 *
 * JAK DODAĆ NOWY PROJEKT:
 *   1. Dodaj wpis do src/data/projects.json
 *   2. Utwórz plik Vue PL + EN
 *   3. Dodaj do mapy w extract-vue-content.js
 *   4. Gotowe – ten skrypt automatycznie wygeneruje strony
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = resolve(__dirname, '..');
const SRC       = resolve(ROOT, 'src');

// ── Helpers ──────────────────────────────────────────────────────────────────

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// Buduje meta description z treści Vue (pierwsze zdanie pierwszego <p>)
function extractFirstParagraph(html) {
  const match = html?.match(/<p[^>]*>([\s\S]*?)<\/p>/);
  if (!match) return '';
  return match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 160);
}

// ── Template ──────────────────────────────────────────────────────────────────

/**
 * Generuje kompletny HTML strony projektu.
 * Strona jest "thin shell" – zawiera pełną treść SEO statycznie,
 * a Vue montuje się na #portfolio-app i otwiera drawer dla danego projektu.
 */
function buildProjectHtml({ project, lang, seoContent, mode }) {
  const isEn   = lang === 'en';
  const slug   = project.slug || project.id;
  const canon  = isEn
    ? `https://cutme.pl/en/portfolio/${slug}/`
    : `https://cutme.pl/portfolio/${slug}/`;
  const altPl  = `https://cutme.pl/portfolio/${slug}/`;
  const altEn  = `https://cutme.pl/en/portfolio/${slug}/`;
  const homeUrl = isEn ? '/en/' : '/';
  const portfolioUrl = isEn ? '/en/#portfolio' : '/#portfolio';

  const shortDesc = isEn ? project.shortDesc.en : project.shortDesc.pl;
  const imageAlt  = isEn ? project.imageAlt.en : project.imageAlt.pl;

  const title = isEn
    ? `${project.title} – Front-end & WordPress project | cutme.pl`
    : `${project.title} – Realizacja front-end | cutme.pl`;

  const metaDesc = isEn
    ? shortDesc.replace(/<[^>]+>/g, '').slice(0, 160)
    : shortDesc.replace(/<[^>]+>/g, '').slice(0, 160);

  const htmlLang  = isEn ? 'en-US' : 'pl-PL';
  const ogLocale  = isEn ? 'en_US' : 'pl_PL';
  const ogLocaleAlt = isEn ? 'pl_PL' : 'en_US';

  const seoHtml = seoContent?.[project.id]?.[lang] ?? '';

  // Breadcrumb JSON-LD
  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isEn ? 'Home' : 'Strona główna',
        item: isEn ? 'https://cutme.pl/en/' : 'https://cutme.pl/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: isEn ? 'https://cutme.pl/en/#portfolio' : 'https://cutme.pl/#portfolio',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: canon,
      },
    ],
  });

  // CreativeWork JSON-LD
  const creativeWorkSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: shortDesc.replace(/<[^>]+>/g, ''),
    url: canon,
    image: `https://cutme.pl${project.image2x || project.image}`,
    author: {
      '@type': 'Person',
      name: 'Bartosz Mediger',
      url: 'https://cutme.pl',
    },
    ...(project.skills?.length ? { keywords: project.skills.join(', ') } : {}),
  });

  const skillTags = (project.skills || [])
    .map(s => `<span class="skill">${s}</span>`)
    .join('\n        ');

  const gtmScript = mode === 'production'
    ? `<!-- Google tag (gtag.js) -->\n  <script async src="https://www.googletagmanager.com/gtag/js?id=G-K4459BSKE4"></script>\n  <script>\n    window.dataLayer = window.dataLayer || [];\n    function gtag(){dataLayer.push(arguments);}\n    gtag('js', new Date());\n    gtag('config', 'G-K4459BSKE4');\n  </script>`
    : `<meta name="robots" content="noindex, nofollow">`;

  const backLabel  = isEn ? '← Back to Portfolio' : '← Wróć do Portfolio';
  const liveLabel  = isEn ? 'View live' : 'Zobacz online';
  const clientLabel = isEn ? 'Client' : 'Klient';
  const langSwitchLabel = isEn ? 'pl' : 'en';
  const langSwitchUrl   = isEn ? altPl : altEn;
  const langSwitchHreflang = isEn ? 'pl' : 'en';

  // Favicon path — strony projektów są 2 poziomy głębiej (/portfolio/slug/)
  const faviconPath = '/img/favicons/favicon-32x32.png';
  // Uwaga: app.js jest entry pointem Vite — w generowanym HTML używamy /app.js
  // żeby Vite mógł go przetworzyć niezależnie od głębokości URL.
  const appJsPath = '/app.js';

  return `<!DOCTYPE html>
<html lang="${htmlLang}" class="no-js">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="shortcut icon" href="${faviconPath}">

  <title>${title}</title>
  <meta name="description" content="${metaDesc}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="mediger.net">

  <!-- Open Graph -->
  <meta property="og:title" content="${title}">
  <meta property="og:type" content="article">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:url" content="${canon}">
  <meta property="og:site_name" content="cutme.pl – Front-end Developer WordPress">
  <meta property="og:image" content="https://cutme.pl${project.image2x || project.image}">
  <meta property="og:image:type" content="image/webp">
  <meta property="og:locale" content="${ogLocale}">
  <meta property="og:locale:alternate" content="${ogLocaleAlt}">

  <!-- hreflang -->
  <link rel="canonical" href="${canon}">
  <link rel="alternate" hreflang="pl" href="${altPl}">
  <link rel="alternate" hreflang="en" href="${altEn}">
  <link rel="alternate" hreflang="x-default" href="${altPl}">

  ${gtmScript}

  <!-- Structured data -->
  <script type="application/ld+json">${breadcrumbSchema}</script>
  <script type="application/ld+json">${creativeWorkSchema}</script>

  <script>
    document.documentElement.className = document.documentElement.className.replace('no-js','js');
  </script>
</head>
<body class="font-sans bg-black text-white" itemscope itemtype="https://schema.org/WebPage">
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NSWJ5JLZ"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

  <script type="module" src="${appJsPath}"></script>

  <!-- Minimal topbar nav -->
  <nav class="flex items-center px-6 py-4 border-b border-white/10" aria-label="${isEn ? 'Project navigation' : 'Nawigacja projektu'}">
    <a href="${homeUrl}"
       class="opacity-70 hover:opacity-100 transition-opacity duration-150"
       aria-label="${isEn ? 'Go to homepage' : 'Wróć na stronę główną'}">
      <img src="/img/assets/logo-white.svg"
           width="120" height="23" alt="cutme.pl – front-end developer WordPress"
           loading="eager">
    </a>
    <a href="${langSwitchUrl}"
       hreflang="${langSwitchHreflang}"
       class="ml-auto text-sm uppercase text-white/50 hover:text-white transition-colors duration-150"
       aria-label="${isEn ? 'Przejdź do polskiej wersji' : 'Switch to English version'}">${langSwitchLabel}</a>
  </nav>

  <main>
    <!-- Breadcrumb – widoczny i indeksowany -->
    <nav class="px-6 py-3 text-sm text-white/40" aria-label="${isEn ? 'Breadcrumb' : 'Ścieżka nawigacyjna'}">
      <ol class="flex flex-wrap gap-2 items-center list-none" itemscope itemtype="https://schema.org/BreadcrumbList">
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <a itemprop="item" href="${homeUrl}" class="hover:text-white transition-colors duration-150">
            <span itemprop="name">${isEn ? 'Home' : 'Strona główna'}</span>
          </a>
          <meta itemprop="position" content="1">
        </li>
        <li aria-hidden="true">/</li>
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <a itemprop="item" href="${portfolioUrl}" class="hover:text-white transition-colors duration-150">
            <span itemprop="name">Portfolio</span>
          </a>
          <meta itemprop="position" content="2">
        </li>
        <li aria-hidden="true">/</li>
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <span itemprop="name" class="text-white/70">${project.title}</span>
          <meta itemprop="position" content="3">
        </li>
      </ol>
    </nav>

    <!-- Statyczna treść projektu – w pełni indeksowana przez Google -->
    <article class="max-w-4xl mx-auto px-6 py-12"
             itemscope itemtype="https://schema.org/CreativeWork">

      <!-- Hero image (SEO: zawsze <img>, nigdy <video> — wydajność i crawlery) -->
      <div class="mb-8 rounded-2xl overflow-hidden">
        <img src="${project.image}"
             srcset="${project.image} 1x${project.image2x ? `, ${project.image2x} 2x` : ''}"
             alt="${imageAlt}"
             width="800" height="480"
             loading="eager"
             itemprop="image"
             class="w-full object-cover">
      </div>

      <!-- Skills -->
      ${project.skills?.length ? `<div class="flex flex-wrap gap-2 mb-6 opacity-60">
        ${skillTags}
      </div>` : ''}

      ${project.client ? `<p class="text-sm text-white/40 mb-2">${clientLabel}: <span itemprop="author" itemscope itemtype="https://schema.org/Person"><span itemprop="name">${project.client}</span></span></p>` : ''}

      <!-- Pełna treść z pliku Vue – wyekstrahowana statycznie -->
      <div class="project-detail-content" itemprop="description">
        ${seoHtml}
      </div>

      <!-- CTA -->
      <div class="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4 items-center">
        ${project.url ? `<a href="${project.url}"
           class="button px-6 py-3"
           target="_blank"
           rel="noopener noreferrer"
           itemprop="url">${liveLabel}</a>` : ''}
        <a href="${portfolioUrl}" class="text-white/50 text-sm hover:text-white transition-colors duration-150">${backLabel}</a>
      </div>
    </article>
  </main>

  <!-- #portfolio-app: Vue montuje się tu, ale na stronie projektu nie używamy portfolio gridu -->
  <div id="portfolio-app" data-open-project="${project.id}" style="display:none"></div>

</body>
</html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function generateProjectPages(projectsSeoContent, mode = 'development') {
  const projects = readJson(resolve(SRC, 'data/projects.json'));
  const inputs   = {};

  for (const project of projects) {
    const slug = project.slug || project.id;

    // PL: src/portfolio/<slug>/index.html
    const plDir  = resolve(SRC, 'portfolio', slug);
    const plFile = resolve(plDir, 'index.html');
    ensureDir(plDir);
    const plHtml = buildProjectHtml({ project, lang: 'pl', seoContent: projectsSeoContent, mode });
    writeFileSync(plFile, plHtml, 'utf-8');
    inputs[`portfolio-${slug}`] = plFile;

    // EN: src/en/portfolio/<slug>/index.html
    const enDir  = resolve(SRC, 'en', 'portfolio', slug);
    const enFile = resolve(enDir, 'index.html');
    ensureDir(enDir);
    const enHtml = buildProjectHtml({ project, lang: 'en', seoContent: projectsSeoContent, mode });
    writeFileSync(enFile, enHtml, 'utf-8');
    inputs[`portfolio-en-${slug}`] = enFile;
  }

  console.log(`[generate-project-pages] Wygenerowano ${Object.keys(inputs).length} stron projektów (${projects.length} PL + ${projects.length} EN)`);
  return inputs;
}

// Uruchamiaj bezpośrednio: node scripts/generate-project-pages.js
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { extractVueContent } = await import('./extract-vue-content.js');
  const seoContent = extractVueContent();
  generateProjectPages(seoContent, 'production');
}
