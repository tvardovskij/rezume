import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  applyTemplate,
  buildSitemapXml,
  buildWebManifest,
  loadSiteContent,
  resolveSeoConfig,
} from './seo.config.mjs'

async function run() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url))
  const rootDir = path.resolve(scriptDir, '..')
  const publicDir = path.join(rootDir, 'public')

  const siteContent = await loadSiteContent(rootDir)
  const config = resolveSeoConfig(process.env, siteContent)
  const appTemplatePath = path.join(rootDir, 'index.template.html')
  const rootTemplatePath = path.join(rootDir, 'index.redirect.template.html')
  const appTemplate = await fs.readFile(appTemplatePath, 'utf8')
  const rootTemplate = await fs.readFile(rootTemplatePath, 'utf8')
  const robotsPath = path.join(publicDir, 'robots.txt')
  const sitemapPath = path.join(publicDir, 'sitemap.xml')
  const manifestPath = path.join(publicDir, 'site.webmanifest')
  const legacyPagePaths = [path.join(rootDir, 'ru.html'), path.join(rootDir, 'en.html')]

  const pageWrites = config.pages.map((page) => {
    const pageHtml = applyTemplate(appTemplate, page.replacements)
    const absoluteOutputPath = path.join(rootDir, page.outputPath)
    return fs.mkdir(path.dirname(absoluteOutputPath), { recursive: true }).then(() =>
      fs.writeFile(absoluteOutputPath, pageHtml, 'utf8'),
    )
  })

  const rootHtml = applyTemplate(rootTemplate, config.rootPage.replacements)
  const rootOutputPath = path.join(rootDir, config.rootPage.outputPath)

  await fs.mkdir(publicDir, { recursive: true })
  await Promise.all([
    ...pageWrites,
    fs.writeFile(rootOutputPath, rootHtml, 'utf8'),
    fs.writeFile(robotsPath, config.robotsTxt, 'utf8'),
    fs.writeFile(sitemapPath, buildSitemapXml(config), 'utf8'),
    fs.writeFile(manifestPath, buildWebManifest(config), 'utf8'),
    ...legacyPagePaths.map((legacyPath) => fs.rm(legacyPath, { force: true })),
  ])

  const generatedPages = [config.rootPage.outputPath, ...config.pages.map((page) => page.outputPath)].join(', ')
  console.log(`[seo] Generated ${generatedPages} + robots/sitemap/manifest for ${config.siteUrl}`)
}

run().catch((error) => {
  console.error('[seo] Failed to generate SEO files')
  console.error(error)
  process.exit(1)
})
