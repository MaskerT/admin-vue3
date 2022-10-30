import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";

// https://vitejs.dev/config/
export default ({mode}) => defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver({
                // 按需引入，主题色的配置，需要加上 importStyle: 'sass'
                importStyle: "sass"
            })],
        }),
        ElementPlus({useSource: true})
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.vue', '.js', 'jsx', '.json'],
    },
    base: "./",
    server: {
        proxy: {
            '/api': {
                target: 'http://backend-api-02.newbee.ltd/manage-api/v1', // 凡是遇到 /api 路径的请求，都映射到 target 属性
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '') // 重写 api 为 空，就是去掉它
            }
        }
    },
    css: {
        preprocessorOptions: {
            // 覆盖掉element-plus包中的主题变量文件
            scss: {
                additionalData: `@use "@/styles/element/index.scss" as *;`,
            },
        },
    },
    build: {
        rollupOptions: {
            // https://rollupjs.org/guide/en/#outputmanualchunks
            // 把路由下的所有组件都打包在同个异步块(chunk)中。
            output: {
                manualChunks: {
                    'group-user': [
                        '@/views/Index.vue',
                        '@/views/AddGood.vue',
                        "@/views/Login.vue",
                        "@/views/Swiper.vue",
                        "@/views/IndexConfig.vue",
                        "@/views/Category.vue",
                        "@/views/Good.vue",
                    ],
                },
            },
        },
    },
})
