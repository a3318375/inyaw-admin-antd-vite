import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import { viteMockServe } from "vite-plugin-mock";
import generouted from '@generouted/react-router/plugin'


const isDev = process.env.NODE_ENV === 'development';
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    plugins: [
        react(),
        generouted(),
        viteMockServe({
            // default
            mockPath: 'src/mock', // mock目录地址 demo中创建的是mock
            enable: true, // 是否在开发环境中启用
        }),
    ],
})
