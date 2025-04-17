import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from 'fs';
import { Plugin } from 'vite';

// https://vitejs.dev/config/
// Plugin personalizado para copiar arquivos adicionais para o diretório de build
function copyExtraFiles(): Plugin {
  return {
    name: 'copy-extra-files',
    closeBundle() {
      // Lista de arquivos HTML adicionais para copiar
      const filesToCopy = [
        // Arquivos HTML
        { src: 'parent-test-v2.html', dest: 'dist/parent-test-v2.html' },

        // Arquivos JS e diretórios
        { src: 'src/lib/api-service.js', dest: 'dist/src/lib/api-service.js' },
        { src: 'src/snippets/code-snippets.js', dest: 'dist/src/snippets/code-snippets.js' }
      ];

      filesToCopy.forEach(file => {
        if (fs.existsSync(file.src)) {
          const content = fs.readFileSync(file.src, 'utf-8');

          // Garantir que o diretório de destino exista
          const destDir = file.dest.substring(0, file.dest.lastIndexOf('/'));
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }

          fs.writeFileSync(file.dest, content);
          console.log(`Copied ${file.src} to ${file.dest}`);
        } else {
          console.warn(`File ${file.src} not found, skipping copy`);
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), copyExtraFiles()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  },
});
