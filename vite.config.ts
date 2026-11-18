import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { publishedContent } from "./scripts/published-content";

export default defineConfig({
  base: '/portfolio/',
  plugins: [publishedContent(), react(), tailwindcss()],
});
