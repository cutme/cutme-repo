/**
 * projects.js — importuje dane z centralnego src/data/projects.json
 *
 * Jedyne źródło prawdy: src/data/projects.json
 * Zmiany w JSON automatycznie działają i w Vue i w prerendered HTML (EJS).
 *
 * JAK DODAĆ NOWY PROJEKT:
 *   1. Dodaj wpis do src/data/projects.json (pl + en)
 *   2. Utwórz plik: src/vue-portfolio/components/projects/ProjectNazwa.vue
 *   3. Dodaj wpis do komponentMap poniżej
 *   4. Gotowe — EJS automatycznie doda projekt do statycznego HTML
 */

import projectsData from '../data/projects.json';

// Mapa komponentów drawer — dynamic import po id projektu
const componentMap = {
  lgg:        () => import('./components/projects/ProjectLgg.vue'),
  mo:         () => import('./components/projects/ProjectMo.vue'),
  domlux:     () => import('./components/projects/ProjectDomlux.vue'),
  karlex:     () => import('./components/projects/ProjectKarlex.vue'),
  '4pharma':  () => import('./components/projects/Project4pharma.vue'),
  mfd:        () => import('./components/projects/ProjectMfd.vue'),
  flowair:    () => import('./components/projects/ProjectFlowair.vue'),
  leasingujesz: () => import('./components/projects/ProjectLeasingujesz.vue'),
  ftfund:     () => import('./components/projects/ProjectFtfund.vue'),
  '126':      () => import('./components/projects/Project126.vue'),
  metoda:     () => import('./components/projects/ProjectMetoda.vue'),
  ltl_biobank: () => import('./components/projects/ProjectLtlBiobank.vue'),
  quar:       () => import('./components/projects/ProjectQuar.vue'),
  brandhub:   () => import('./components/projects/ProjectBrandhub.vue'),
};

const componentMapEn = {
  lgg:        () => import('./components/projects/en/ProjectLggEn.vue'),
  mo:         () => import('./components/projects/en/ProjectMoEn.vue'),
  domlux:     () => import('./components/projects/en/ProjectDomluxEn.vue'),
  karlex:     () => import('./components/projects/en/ProjectKarlexEn.vue'),
  '4pharma':  () => import('./components/projects/en/Project4pharmaEn.vue'),
  mfd:        () => import('./components/projects/en/ProjectMfdEn.vue'),
  flowair:    () => import('./components/projects/en/ProjectFlowairEn.vue'),
  leasingujesz: () => import('./components/projects/en/ProjectLeasingujeszEn.vue'),
  ftfund:     () => import('./components/projects/en/ProjectFtfundEn.vue'),
  '126':      () => import('./components/projects/en/Project126En.vue'),
  metoda:     () => import('./components/projects/en/ProjectMetodaEn.vue'),
  ltl_biobank: () => import('./components/projects/en/ProjectLtlBiobankEn.vue'),
  quar:       () => import('./components/projects/en/ProjectQuarEn.vue'),
  brandhub:   () => import('./components/projects/en/ProjectBrandhubEn.vue'),
};

// Buduj tablice projektów dla PL i EN z jednego źródła danych
export const projects = projectsData.map(p => ({
  ...p,
  shortDesc: p.shortDesc.pl,
  imageAlt: p.imageAlt.pl,
  component: componentMap[p.id] || null,
}));

export const projects_en = projectsData.map(p => ({
  ...p,
  shortDesc: p.shortDesc.en,
  imageAlt: p.imageAlt.en,
  component: componentMapEn[p.id] || null,
}));
