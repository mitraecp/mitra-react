import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from 'fs';
import { Plugin } from 'vite';

// https://vitejs.dev/config/
// Plugin personalizado para copiar arquivos HTML adicionais para o diretório de build
function copyExtraHtml(): Plugin {
  return {
    name: 'copy-extra-html',
    closeBundle() {
      // Lista de arquivos HTML adicionais para copiar
      const htmlFiles = ['parent-test-v2.html'];

      htmlFiles.forEach(file => {
        if (fs.existsSync(file)) {
          const content = fs.readFileSync(file, 'utf-8');
          const outDir = 'dist';

          if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
          }

          fs.writeFileSync(`${outDir}/${file}`, content);
          console.log(`Copied ${file} to ${outDir}/${file}`);
        } else {
          console.warn(`File ${file} not found, skipping copy`);
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), copyExtraHtml()],
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
