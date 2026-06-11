import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, extname, relative } from 'path'
import { fileURLToPath } from 'url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

// Library mode: build components + core as ES + CJS
function libConfig() {
  return defineConfig({
    plugins: [react()],
    build: {
      lib: {
        entry: resolve(rootDir, 'src/lib/index.ts'),
        name: 'LiquidGlass',
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: [
          {
            format: 'es',
            entryFileNames: '[name].js',
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'jsxRuntime',
            },
            preserveModules: true,
            preserveModulesRoot: 'src',
          },
          {
            format: 'cjs',
            entryFileNames: '[name].cjs',
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'jsxRuntime',
            },
            preserveModules: true,
            preserveModulesRoot: 'src',
          },
        ],
      },
      cssCodeSplit: false,
    },
  })
}

// Demo / dev mode
function demoConfig() {
  return defineConfig({
    plugins: [react()],
  })
}

export default defineConfig(({ mode }) => {
  if (mode === 'lib') return libConfig()
  return demoConfig()
})
