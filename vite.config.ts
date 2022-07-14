import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'


import { resolve } from 'path'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('src'),
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    alias,
  }
})
