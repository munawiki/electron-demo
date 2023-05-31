import fsPromises from 'fs/promises'
import path from 'path'
import os from 'os'

const tmpFolderPaths = os.tmpdir()

export const writeHelloWorldTextFile = (): Promise<void> => {
  const filePath = path.join(tmpFolderPaths, 'hello-world.txt')
  return fsPromises.writeFile(filePath, 'Hello World!')
}

export const readHelloWorldTextFile = (): Promise<string> => {
  const filePath = path.join(tmpFolderPaths, 'hello-world.txt')
  return fsPromises.readFile(filePath, 'utf-8')
}
