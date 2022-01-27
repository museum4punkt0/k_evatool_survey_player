import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pluginEnv from 'vite-plugin-vue-env'

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.ELECTRON=="true" ? './' : ".",
    plugins: [vue(), pluginEnv()],
    server: {
        port: 3001,
    },
})
