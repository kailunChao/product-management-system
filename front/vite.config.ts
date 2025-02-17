import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { join } from 'node:path'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': join(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            'src/assets/css/common.less'
          )}";`
        },
        javascriptEnabled: true
      }
    }
  }
})
