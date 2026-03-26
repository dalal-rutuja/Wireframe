import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const tailwindConfigPath = path.join(__dirname, "tailwind.config.js")

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs so CSS/JS load when opening dist/index.html or hosting under a subpath
  base: "./",
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss({ config: tailwindConfigPath }), autoprefixer()],
    },
  },
})
