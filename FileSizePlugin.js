/**
 * Gets size stats for built islands.
 */
const { basename, join } = require('path')
const { green, red, yellow, white } = require('kleur')
const gzipSize = require('gzip-size')
const brotliSize = require('brotli-size')
const prettyBytes = require('pretty-bytes')
const fs = require('fs/promises')

/**
 *
 * Sauce pulled from here:
 * https://github.com/developit/microbundle/blob/ecb0b022912397bcf98550c1a783e9e0534f33e5/src/lib/compressed-size.js
 */
function getPadLeft(str, width, char = ' ') {
  return char.repeat(width - str.length)
}

function formatSize(size, filename, suffix, raw) {
  const pretty = raw ? `${size} B` : prettyBytes(size)
  const color = size < 5000 ? green : size > 40000 ? red : yellow
  const indent = getPadLeft(pretty, 13)
  return `${indent}${color(pretty)}: ${white(basename(filename))}${suffix}`
}

async function getSizeInfo(path, filename) {
  const code = await fs.readFile(path)

  const [original, gzip, brotli] = await Promise.all([
    fs.stat(path).then((x) => x.size),
    gzipSize(code).catch(() => null),
    brotliSize.sync(code),
  ])

  const raw = original < 5000

  let out = formatSize(original, filename, '', raw)

  out += '\n' + formatSize(gzip, filename, '.gz', raw)

  if (brotli) {
    out += '\n' + formatSize(brotli, filename, '.br', raw)
  }

  return out
}

class FileSizePlugin {
  apply(compiler) {
    compiler.hooks.done.tap(
      'File Size Plugin',
      async (
        stats /* stats is passed as an argument when done hook is tapped.  */,
      ) => {
        const promises = []
        stats.compilation.assetsInfo.forEach((value, key) => {
          const filePath = join(stats.compilation.outputOptions.path, key)
          promises.push(getSizeInfo(filePath, key))
        })

        const resolve = await Promise.all(promises)

        resolve.map((log) => console.log(log))
      },
    )
  }
}

module.exports = FileSizePlugin
