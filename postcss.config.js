import path from "node:path"
import { fileURLToPath } from "node:url"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Keeps Tailwind in sync with CLI / other tools; Vite also sets postcss in vite.config.js */
export default {
  plugins: [
    tailwindcss({ config: path.join(__dirname, "tailwind.config.js") }),
    autoprefixer(),
  ],
}
