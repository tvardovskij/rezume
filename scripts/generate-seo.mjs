import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { applyTemplate, buildSitemapXml, buildWebManifest, resolveSeoConfig } from './seo.config.mjs'

async function run() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url))
  const rootDir = path.resolve(scriptDir, '..')
  const publicDir = path.join(rootDir, 'public')

  const config = resolveSeoConfig(process.env)
  const indexTemplatePath = path.join(rootDir, 'index.template.html')
  const indexPath = path.join(rootDir, 'index.html')
  const robotsPath = path.join(publicDir, 'robots.txt')
  const sitemapPath = path.join(publicDir, 'sitemap.xml')
  const manifestPath = path.join(publicDir, 'site.webmanifest')

  const indexTemplate = await fs.readFile(indexTemplatePath, 'utf8')
  const indexHtml = applyTemplate(indexTemplate, config.replacements)

  await fs.mkdir(publicDir, { recursive: true })
  await Promise.all([
    fs.writeFile(indexPath, indexHtml, 'utf8'),
    fs.writeFile(robotsPath, config.robotsTxt, 'utf8'),
    fs.writeFile(sitemapPath, buildSitemapXml(config), 'utf8'),
    fs.writeFile(manifestPath, buildWebManifest(config), 'utf8'),
  ])

  console.log(`[seo] Generated index + robots/sitemap/manifest for ${config.canonicalUrl}`)
}

run().catch((error) => {
  console.error('[seo] Failed to generate SEO files')
  console.error(error)
  process.exit(1)
})
