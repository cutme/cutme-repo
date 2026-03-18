import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tailwindcss from '@tailwindcss/vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => ({
  root: 'src',

  plugins: [
    tailwindcss(),
    ViteEjsPlugin(
      { NODE_ENV: mode },
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
        { src: 'img/**/*',   dest: 'img' },
        { src: 'fonts/**/*', dest: 'fonts' },
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
