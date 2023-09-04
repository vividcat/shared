import esbuild, { minify } from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'

const pluginEsbuild = esbuild()
const pluginDts = dts()

const iifeName = 'ViShared'
const entries = {
  'index': 'src/index.ts',
  'ssr': 'src/index.ssr.ts',
  'base': 'src/base/index.ts',
  'color': 'src/color.ts',
  'dom': 'src/dom/index.ts',
  'env': 'src/env/index.ts',
  'env-browser': 'src/env/index.browser.ts',
  'env-mobile': 'src/env/index.mobile.ts',
  'env-features': 'src/env/index.features.ts',
  'logic': 'src/logic/index.ts',
  'math': 'src/math.ts',
  'regexp': 'src/regexp.ts',
  'string': 'src/string.ts',
  'supports': 'src/supports.ts',
  'vue': 'src/vue/index.ts',
}

const externals = [
  'vue',
]

const configs = []

for (const [exportName, dirSrc] of Object.entries(entries)) {
  configs.push({
    input: dirSrc,
    output: [
      { file: `dist/${exportName}.mjs`, format: 'es' },
      { file: `dist/${exportName}.js`, format: 'cjs' },
    ],
    external: [
      ...externals,
    ],
    plugins: [
      pluginEsbuild,
    ],
  }, {
    input: dirSrc,
    output: [
      { file: `dist/${exportName}.d.ts` },
      { file: `dist/${exportName}.d.mts` },
    ],
    external: [
      ...externals,
    ],
    plugins: [
      pluginDts,
    ],
  })
}

configs.push({
  input: entries.index,
  output: {
    file: 'dist/index.iife.js',
    format: 'iife',
    name: iifeName,
  },
  external: [
    ...externals,
  ],
  plugins: [
    pluginEsbuild,
  ],
}, {
  input: entries.index,
  output: {
    file: 'dist/index.iife.min.js',
    format: 'iife',
    name: iifeName,
  },
  external: [
    ...externals,
  ],
  plugins: [
    pluginEsbuild,
    minify(),
  ],
})

export default configs
