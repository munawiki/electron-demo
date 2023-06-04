import fsPromises from 'fs/promises'

const checkPathType = async (path: string): Promise<'directory' | 'file'> => {
  const stats = await fsPromises.stat(path)

  if (stats.isDirectory()) return 'directory'
  if (stats.isFile()) return 'file'

  throw new Error('Path is not a directory or file')
}

const readDirectory = async (path: string): Promise<string[]> => {
  const files = await fsPromises.readdir(path)

  const filesWithFullPath = files.map((file) => `${path}/${file}`)

  return filesWithFullPath
}

const readFile = async (path: string): Promise<string> => {
  const file = await fsPromises.readFile(path, 'utf-8')
  return file
}

const writeFile = async (path: string, content: string): Promise<void> => {
  await fsPromises.writeFile(path, content)
}

export const handleReadFile = async (path: string): Promise<string[] | string> => {
  const pathType = await checkPathType(path)

  if (pathType === 'directory') return await readDirectory(path)
  if (pathType === 'file') return await readFile(path)

  throw new Error('Path is not a directory or file')
}

export const handleWriteFile = async (path: string, content: string): Promise<void> => {
  const pathType = await checkPathType(path)

  if (pathType === 'directory') throw new Error('Path is a directory')

  writeFile(path, content)
}
