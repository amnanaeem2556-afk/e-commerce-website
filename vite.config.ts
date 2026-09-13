import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 479537bc8f1a769ad4494180d4ea4d73351b05a3
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-server',
        configureServer(server) {
          let appPromise: Promise<any> | null = null;
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api')) {
              try {
                if (!appPromise) {
                  appPromise = import('./server/index.ts');
                }
                const { app } = await appPromise;
                return app(req, res, next);
              } catch (err) {
                console.error('[AI Studio] API error:', err);
                return next(err);
              }
            }
            next();
          });
        }
      }
    ],
<<<<<<< HEAD
=======
=======
    plugins: [react(), tailwindcss()],
>>>>>>> dc76fe99c39430892f270c31a641850b11e26596
>>>>>>> 479537bc8f1a769ad4494180d4ea4d73351b05a3
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
<<<<<<< HEAD
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
=======
<<<<<<< HEAD
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
=======
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        }
      },
>>>>>>> dc76fe99c39430892f270c31a641850b11e26596
>>>>>>> 479537bc8f1a769ad4494180d4ea4d73351b05a3
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
