import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import image from '@rollup/plugin-image';

const DEV_UI_SCRIPT = `
    import {
        breadcrumbs,
        footer,
        footerMenus,
        header,
        qaBot,
        siteMenus,
        tableOfContents,
        universalMenuItems,
        universalMenus,
    } from "https://unpkg.com/@access-ci/ui@0.18.1/dist/access-ci-ui.js";
    
    window.ACCESS_CI_UI = {
        breadcrumbs,
        footer,
        footerMenus,
        header,
        qaBot,
        siteMenus,
        tableOfContents,
        universalMenuItems,
        universalMenus,
    };
`;

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        image(),
        {
            name: 'inject-dev-only-ui',
            apply: 'serve', // ⚡️ Only applies during local development
            transformIndexHtml(html) {
                return html.replace(
                    '</head>',
                    `<script type="module">${DEV_UI_SCRIPT}</script></head>`
                );
            }
        }
    ],
    build: {
        assetsInlineLimit: 100000000,
        rollupOptions: {
            output: {
                dir: './build',
                // Disable code splitting and create a single entry file

                manualChunks: false,
                inlineDynamicImports: true,
                entryFileNames: `[name].js`, // Customize the output filename
                assetFileNames: `[name].[ext]`, // Customize asset filenames (e.g., CSS)
            },
        },
    },
})
