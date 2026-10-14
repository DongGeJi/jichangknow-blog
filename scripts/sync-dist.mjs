import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'docs', '.vitepress', 'dist')
const dest = path.join(root, 'dist')

try {
  await fs.rm(dest, { recursive: true, force: true })
  await fs.cp(src, dest, { recursive: true })
  console.log('✓ Successfully synced docs/.vitepress/dist to root dist/')
} catch (err) {
  console.error('Failed to sync dist:', err)
  process.exit(1)
}
