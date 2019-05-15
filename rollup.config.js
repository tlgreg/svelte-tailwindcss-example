import purgeCss from '@fullhuman/postcss-purgecss'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import tailwind from 'tailwindcss'

const production = !process.env.ROLLUP_WATCH
const removeUnusedCss = purgeCss({
  content: ['./src/**/*.html', './src/**/*.svelte'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
})

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
  },
  plugins: [
    svelte({
      dev: !production,
      emitCss: true,
    }),
    postcss({
      plugins: [
        postcssImport,
        tailwind(),
        autoprefixer,
        production && removeUnusedCss,
      ].filter(Boolean),
      extract: 'public/bundle.css',
    }),
    resolve(),
    commonjs(),
    !production && livereload('public'),
    production && terser(),
  ],
}
