import * as path from 'path';
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [reactRouter()],
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
})
