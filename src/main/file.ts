import fsPromises from 'fs/promises'
import path from 'path'
import os from 'os'

const tmpFolderPaths = os.tmpdir()

export const writeHelloWorldTextFile = async (): Promise<string> => {
  const filePath = path.join(tmpFolderPaths, 'hello-world.txt')
  await fsPromises.writeFile(filePath, 'Hello World!')
  return filePath
}

export const readHelloWorldTextFile = (): Promise<string> => {
  const filePath = path.join(tmpFolderPaths, 'hello-world.txt')
  return fsPromises.readFile(filePath, 'utf-8')
}
