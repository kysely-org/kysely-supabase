import { rename, unlink, watch } from 'node:fs/promises'
import { join } from 'node:path'
import {defineConfig} from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['./src/index.mts'],
  format: ['cjs', 'esm'],
})
