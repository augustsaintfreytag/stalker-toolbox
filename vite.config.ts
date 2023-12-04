import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"~": "/src"
		}
	},
	css: {
		preprocessorOptions: {
			sass: {}
		}
	},
	plugins: [react()]
})
