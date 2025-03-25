import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import postcssPxToViewport from 'postcss-px-to-viewport-8-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    postcss: {
      plugins: [
        postcssPxToViewport({
          unitToConvert: 'px',
          viewportWidth: 1729.289, // Figma 设计稿的宽度
          viewportHeight: 1153, // Figma 设计稿的高度
          unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数
          propList: ['*'], // 能转化为 vw 的属性列表
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用 vw
          fontViewportUnit: 'vw', // 字体使用的视窗单位
          selectorBlackList: [], // 指定不转换为视窗单位的类名
          minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位  
          mediaQuery: false, // 允许在媒体查询中转换`px`
          replace: true, // 是否直接更换属性值，而不添加备用属性
          exclude: [], // 忽略某些文件夹下的文件或特定文件
          landscape: false, // 是否处理横屏情况
          landscapeUnit: 'vw', // 横屏时使用的单位  
          landscapeWidth: 1153 // 横屏时使用的视口宽度
        }) as any
      ]
    }
  }
})
