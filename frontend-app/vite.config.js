import react from '@vitejs/plugin-react-swc'

import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
 
  // Expose environment variables to the client
  define: {
    'process.env': {}
  }
});
