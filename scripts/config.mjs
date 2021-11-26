import path from 'path'
import { fileURLToPath } from 'url'

const current = path.dirname(fileURLToPath(import.meta.url))
export const ROOT_PATH = path.resolve(current, '../')
export const DIST_PATH = path.join(ROOT_PATH, 'dist')
export const PUBLIC_PATH = path.join(ROOT_PATH, 'public')
