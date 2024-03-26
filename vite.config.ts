import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import generouted from '@generouted/react-router/plugin'

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    plugins: [
        react(),
        generouted(),
    ],
})
