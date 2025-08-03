import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      // Proxy for HTTP API
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // Proxy for WebSocket
      '/ws': {
        target: 'ws://localhost:4000',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws\/api/, '')
      }
    }
  }
})
