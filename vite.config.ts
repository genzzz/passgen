import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Base path for GitHub Pages deployment
  // Change 'passgen' to your repository name
  base: '/passgen/',
  server: {
    port: 3000,
    strictPort: true,
  },
  plugins: [
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'maskable-icon-512x512.png'],
      manifest: {
        name: 'Random Password Generator',
        short_name: 'rpg',
        description: 'Free random password generator with real-time strength analysis. Create secure passwords up to 32 characters with letters, numbers & symbols. Privacy-first design.',
        theme_color: '#ffffff',
        icons: [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      }
    })
  ],
});
