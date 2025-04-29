import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Headers necessários para Cross-Origin Isolation (necessário para SharedArrayBuffer)
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
    // Evitar conflitos de porta
    port: 5173,
    // Permitir acesso de outros dispositivos na rede
    host: true,
  },
  // Configurações de build
  build: {
    // Melhorar o tratamento de erros
    sourcemap: true,
  },
})
