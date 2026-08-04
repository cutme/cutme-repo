/**
 * extract-vue-content.js
 *
 * Parsuje pliki Vue komponentów projektów i wyciąga z nich statyczny HTML
 * (bez Vue-specyficznych dyrektyw jak v-if, v-for, :src itp.)
 * Wynik zapisuje do src/data/projects-seo-content.json
 *
 * Uruchamiany automatycznie przez vite.config.js przed buildem i w trybie dev.
 * Dane ZAWSZE pochodzą z jednego źródła: plików Vue — nie ma duplikacji.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Mapa: id projektu → plik Vue PL + EN
const projectVueMap = {
  lgg:          { pl: 'ProjectLgg.vue',          en: 'en/ProjectLggEn.vue' },
  mo:           { pl: 'ProjectMo.vue',            en: 'en/ProjectMoEn.vue' },
  domlux:       { pl: 'ProjectDomlux.vue',        en: 'en/ProjectDomluxEn.vue' },
  karlex:       { pl: 'ProjectKarlex.vue',        en: 'en/ProjectKarlexEn.vue' },
  '4pharma':    { pl: 'Project4pharma.vue',       en: 'en/Project4pharmaEn.vue' },
  mfd:          { pl: 'ProjectMfd.vue',           en: 'en/ProjectMfdEn.vue' },
  flowair:      { pl: 'ProjectFlowair.vue',       en: 'en/ProjectFlowairEn.vue' },
  leasingujesz: { pl: 'ProjectLeasingujesz.vue',  en: 'en/ProjectLeasingujeszEn.vue' },
  ftfund:       { pl: 'ProjectFtfund.vue',        en: 'en/ProjectFtfundEn.vue' },
  '126':        { pl: 'Project126.vue',           en: 'en/Project126En.vue' },
  metoda:       { pl: 'ProjectMetoda.vue',        en: 'en/ProjectMetodaEn.vue' },
  ltl_biobank:  { pl: 'ProjectLtlBiobank.vue',    en: 'en/ProjectLtlBiobankEn.vue' },
  quar:         { pl: 'ProjectQuar.vue',          en: 'en/ProjectQuarEn.vue' },
  brandhub:     { pl: 'ProjectBrandhub.vue',      en: 'en/ProjectBrandhubEn.vue' },
};

const PROJECTS_DIR = resolve(ROOT, 'src/vue-portfolio/components/projects');

/**
 * Wyciąga blok <template>...</template> z pliku .vue
 */
function extractTemplate(vueSource) {
  const match = vueSource.match(/<template>([\s\S]*?)<\/template>/);
  return match ? match[1].trim() : '';
}

/**
 * Konwertuje Vue template na statyczny HTML:
 * - usuwa Vue-specyficzne dyrektywy i bindingi
 * - zastępuje dynamiczne src/srcset/alt statycznym placeholderem
 * - usuwa elementy footer (przyciski "Zamknij", "Close" — zbędne dla SEO)
 * - usuwa pd__hero img (SEO ma już img z ProjectCard)
 * - zachowuje pełną treść tekstową i strukturę semantyczną
 */
function vueTemplateToStaticHtml(template) {
  let html = template;

  // Usuń PdHero — w SEO build hero renderowany osobno z danych projektu,
  // nie ze zdynamizowanego komponentu Vue (który może mieć wideo)
  html = html.replace(/<PdHero[^/]*\/>/g, '');
  html = html.replace(/<PdHero[^>]*>[\s\S]*?<\/PdHero>/g, '');

  // Usuń cały blok pd__hero (legacy — fallback jeśli ktoś zostawi stary wzorzec)
  html = html.replace(/<div class="pd__hero">[\s\S]*?<\/div>/g, '');

  // Usuń bloki <video> jeśli przypadkowo trafią do szablonu
  html = html.replace(/<video[^>]*>[\s\S]*?<\/video>/g, '');

  // Usuń cały blok pd__skills (tagsy umiejętności — już widoczne w kartach)
  html = html.replace(/<div[^>]*v-if="project\.skills[^"]*"[^>]*class="pd__skills"[^>]*>[\s\S]*?<\/div>/g, '');
  html = html.replace(/<div[^>]*class="pd__skills"[^>]*v-if="project\.skills[^"]*"[^>]*>[\s\S]*?<\/div>/g, '');

  // Usuń cały blok footer (przyciski "Zobacz online", "Zamknij" itp.)
  html = html.replace(/<footer[^>]*class="pd__footer"[^>]*>[\s\S]*?<\/footer>/g, '');

  // Usuń Vue dyrektywy z tagów (v-nowidows, v-if, v-for, :key, @click itd.)
  html = html.replace(/\s+v-nowidows/g, '');
  html = html.replace(/\s+v-if="[^"]*"/g, '');
  html = html.replace(/\s+v-for="[^"]*"/g, '');
  html = html.replace(/\s+:key="[^"]*"/g, '');
  html = html.replace(/\s+@click="[^"]*"/g, '');
  html = html.replace(/\s+@click\.prevent/g, '');
  html = html.replace(/\s+:src="[^"]*"/g, '');
  html = html.replace(/\s+:srcset="[^"]*"/g, '');
  html = html.replace(/\s+:alt="[^"]*"/g, '');
  html = html.replace(/\s+:href="[^"]*"/g, '');

  // Usuń puste tagi span z Vue interpolacją {{ skill }}
  html = html.replace(/<span[^>]*>\s*\{\{\s*skill\s*\}\}\s*<\/span>/g, '');

  // Usuń Vue interpolacje {{ ... }}
  html = html.replace(/\{\{[^}]*\}\}/g, '');

  // Usuń puste bloki div/span które zostały po usunięciu dyrektyw
  html = html.replace(/<div[^>]*>\s*<\/div>/g, '');
  html = html.replace(/<span[^>]*>\s*<\/span>/g, '');

  // Normalize whitespace
  html = html.replace(/\n{3,}/g, '\n\n');
  html = html.trim();

  return html;
}

/**
 * Główna funkcja: parsuje wszystkie Vue i zapisuje JSON
 */
export function extractVueContent() {
  const result = {};
  let changed = false;

  for (const [projectId, files] of Object.entries(projectVueMap)) {
    result[projectId] = {};

    for (const [lang, relPath] of Object.entries(files)) {
      const filePath = resolve(PROJECTS_DIR, relPath);

      if (!existsSync(filePath)) {
        console.warn(`[extract-vue-content] Brak pliku: ${filePath}`);
        result[projectId][lang] = '';
        continue;
      }

      const source = readFileSync(filePath, 'utf-8');
      const template = extractTemplate(source);
      const staticHtml = vueTemplateToStaticHtml(template);
      result[projectId][lang] = staticHtml;
    }
  }

  const outPath = resolve(ROOT, 'src/data/projects-seo-content.json');

  // Sprawdź czy potrzeba nadpisania (unikaj niepotrzebnych zapisów w watch mode)
  let existingContent = '';
  if (existsSync(outPath)) {
    existingContent = readFileSync(outPath, 'utf-8');
  }
  const newContent = JSON.stringify(result, null, 2);

  if (existingContent !== newContent) {
    writeFileSync(outPath, newContent, 'utf-8');
    changed = true;
    console.log('[extract-vue-content] Wygenerowano projects-seo-content.json');
  }

  return result;
}

// Uruchamiaj bezpośrednio: node scripts/extract-vue-content.js
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  extractVueContent();
}
