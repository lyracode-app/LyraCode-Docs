import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '../docs/public/examples')
const packages = ['static-site', 'project-review', 'status-orb']
const check = process.argv.includes('--check')

function crc32(bytes) {
  let crc = 0xffffffff
  for (const byte of bytes) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
  }
  return (crc ^ 0xffffffff) >>> 0
}

function files(directory, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en')).flatMap(entry => {
    const name = `${prefix}${entry.name}`
    if (entry.isDirectory()) return files(join(directory, entry.name), `${name}/`)
    if (!entry.isFile()) throw new Error(`Unsupported example entry: ${name}`)
    let bytes = readFileSync(join(directory, entry.name))
    // Keep archives stable when Git checks text out with Windows line endings.
    if (/\.(?:html|css|js|json|toml|md)$/i.test(name)) bytes = Buffer.from(bytes.toString('utf8').replace(/\r\n?/g, '\n'))
    return [{ name, bytes }]
  })
}

// Stored ZIP entries need no third-party archiver. Fixed metadata keeps rebuilds identical.
function zip(entries) {
  const local = [], central = []
  let offset = 0
  for (const { name, bytes } of entries) {
    const filename = Buffer.from(name)
    const checksum = crc32(bytes)
    const header = Buffer.alloc(30)
    header.writeUInt32LE(0x04034b50)
    header.writeUInt16LE(20, 4)
    header.writeUInt16LE(0x800, 6)
    header.writeUInt16LE(33, 12) // 1980-01-01
    header.writeUInt32LE(checksum, 14)
    header.writeUInt32LE(bytes.length, 18)
    header.writeUInt32LE(bytes.length, 22)
    header.writeUInt16LE(filename.length, 26)
    local.push(header, filename, bytes)
    const record = Buffer.alloc(46)
    record.writeUInt32LE(0x02014b50)
    record.writeUInt16LE(20, 4)
    record.writeUInt16LE(20, 6)
    record.writeUInt16LE(0x800, 8)
    record.writeUInt16LE(33, 14)
    record.writeUInt32LE(checksum, 16)
    record.writeUInt32LE(bytes.length, 20)
    record.writeUInt32LE(bytes.length, 24)
    record.writeUInt16LE(filename.length, 28)
    record.writeUInt32LE(offset, 42)
    central.push(record, filename)
    offset += header.length + filename.length + bytes.length
  }
  const directory = Buffer.concat(central)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50)
  end.writeUInt16LE(entries.length, 8)
  end.writeUInt16LE(entries.length, 10)
  end.writeUInt32LE(directory.length, 12)
  end.writeUInt32LE(offset, 16)
  return Buffer.concat([...local, directory, end])
}

for (const name of packages) {
  const target = join(root, `${name}.zip`)
  const archive = zip(files(join(root, name)))
  if (check) {
    if (!readFileSync(target).equals(archive)) throw new Error(`${name}.zip is stale; run npm run examples:pack`)
  } else writeFileSync(target, archive)
}
console.log(`${check ? 'Verified' : 'Packed'} ${packages.length} example archives.`)
