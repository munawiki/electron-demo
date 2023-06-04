import { ElectronAPI } from '@electron-toolkit/preload'
import { NetworkStatus } from 'src/shared/types'

// extractZip: (filePaths: string): Promise<string[]> =>
// ipcRenderer.invoke('extract-zip', filePaths),
// sendSocketMessage: (message: string): void => {
// socket.emit('chat message', message)
// },
// receiveSocketMessage: (callback: (message: string) => void): void => {
// socket.on('message', (message) => {
//   callback(message)
// })
// }

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getOSInformations: () => Promise<IGetOSInformations>
      checkNetworkStatus: () => Promise<NetworkStatus>
      readFile: (path: string) => Promise<string[] | string>
      writeFile: (path: string, content: string) => Promise<void>
      crawlNews: () => Promise<string[]>
      getDynamicContents: (url: string) => Promise<string>
      extractZip: (filePaths: string) => Promise<string[]>
      sendSocketMessage: (message: string) => void
      receiveSocketMessage: (callback: (message: string) => void) => void
    }
  }
}
