import * as path from 'path';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';

import { reactRouter } from '@react-router/dev/vite';

// https://vite.dev/config/
export default defineConfig(({ command, isPreview}) => ({
    plugins: [
        reactRouter(),
        command === 'serve' && !isPreview
            ? mkcert({
                hosts: ["localhost", "127.0.0.1", "192.168.43.93"],
            })
            : null,
        VitePWA({
            registerType: 'autoUpdate',
            outDir: 'build/client',
            workbox: {
                globDirectory: 'build/client',
                globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
            },
            devOptions: {
                enabled: true,
            },
            manifest: {
                name: "Isotopes",
                short_name: "Isotopes",
                start_url: "/isotopes-frontend/",
                display: "standalone",
                background_color: "#0C1A2A",
                theme_color: "#9AEB36",
                lang: 'ru',
                scope: "/isotopes-frontend/",
                orientation: "portrait-primary",
                icons: [
                    {
                        "src": "pwa/logo192.png",
                        "type": "image/png",
                        "sizes": "192x192"
                    },
                    {
                        "src": "pwa/logo512.png",
                        "type": "image/png",
                        "sizes": "512x512"
                    }
                ],
            },
        })
    ],
    base: "/isotopes-frontend/",
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, './src'),
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            },
            '/s3': {
                target: 'http://localhost:9000',
                changeOrigin: true,
                rewrite: (path) => path.replace('/s3', '')
            },
        }
    }
}))
