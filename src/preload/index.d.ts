import { ElectronAPI } from '@electron-toolkit/preload'
import { CheckNetworkStatusResponse } from '../shared/node/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getOSInformations: (callback: (params: string) => void) => void
      checkNetworkStatus: () => Promise<CheckNetworkStatusResponse>
      writeHelloWorldTextFile: () => Promise<string>
      readHelloWorldTextFile: () => Promise<string>
      crawlLOL: () => Promise<string[]>
    }
  }
}
