import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === "serve") {
    return {
      // dev specific config
      plugins: [react()],
      server: {
        port: 8080,
      },
    };
  } else {
    // command === 'build'
    return {
      // build specific config
      base: "/toWatch/",
    };
  }
});