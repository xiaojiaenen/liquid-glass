import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

// Library mode: build components + core as ES + CJS + .d.ts
function libConfig() {
  return defineConfig({
    plugins: [
      react(),
      dts({
        include: ['src/lib/**', 'src/components/**'],
        outDir: 'dist',
        rollupTypes: false,
      }),
    ],
    build: {
      lib: {
        entry: resolve(rootDir, 'src/lib/index.ts'),
        name: 'LiquidGlass',
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime', 'prism-react-renderer'],
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
