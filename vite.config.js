import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sandbox/preview override: the Base44 preview proxy reaches the dev server under a
// rotating `<port>-<sandbox id>.<BASE44_SANDBOX_HOST_DOMAIN>` Host header, which Vite's
// dev-server host check would otherwise reject. Only active when BASE44_PREVIEW_MODE
// equals "1"; with the flag unset the allow-list stays at localhost (default behaviour).
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

const allowedHosts = ['localhost', '127.0.0.1']
if (previewMode && sandboxHostDomain) {
  allowedHosts.push(`.${sandboxHostDomain}`)
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts,
    // Bind mounts on Linux microVMs do not always deliver inotify events.
    watch: { usePolling: true, interval: 300 },
  },
})
