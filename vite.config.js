import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tailwindcss from '@tailwindcss/vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import vue from '@vitejs/plugin-vue';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Wczytaj dane — jedno źródło prawdy dla EJS i Vue
const projects = JSON.parse(readFileSync(resolve(__dirname, 'src/data/projects.json'), 'utf-8'));
const opinions = JSON.parse(readFileSync(resolve(__dirname, 'src/data/opinions.json'), 'utf-8'));

// Automatycznie generuj statyczny SEO content z plików Vue
// (pełne opisy projektów renderowane statycznie — bez duplikowania danych)
const { extractVueContent } = await import('./scripts/extract-vue-content.js');
const projectsSeoContent = extractVueContent();

// Generuj statyczne strony projektów (PL + EN) i zwróć ich entry points
const { generateProjectPages } = await import('./scripts/generate-project-pages.js');
const projectPageInputs = generateProjectPages(projectsSeoContent, process.env.NODE_ENV || 'development');

export default defineConfig(({ mode }) => ({
  root: 'src',

  plugins: [
    tailwindcss(),
    ViteEjsPlugin(
      { NODE_ENV: mode, projects, opinions, projectsSeoContent },
      {
        ejs: {
          // Pozwala na relative include() w szablonach podrzędnych (.ejs)
          views: [resolve(__dirname, 'src')],
        },
      }
    ),
    vue(),
    // Kopiuje zasoby statyczne do dist (obrazy, fonty, phpmailer)
    viteStaticCopy({
      targets: [
        { src: 'img',        dest: '.' },
        { src: 'fonts',      dest: '.' },
        { src: 'robots.txt',  dest: '' },
        { src: 'sitemap.xml', dest: '' },
        { src: '.htaccess',   dest: '' },
      ],
    }),
  ],

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        en:   resolve(__dirname, 'src/en/index.html'),
        // Strony projektów generowane dynamicznie przez generate-project-pages.js
        ...projectPageInputs,
      },
    },
    assetsDir: 'assets',
    sourcemap: false,
  },

  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
}));
