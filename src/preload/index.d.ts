import { ElectronAPI } from '@electron-toolkit/preload'
import { CheckNetworkStatusResponse } from '../shared/node/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getOSInformations: (callback: (params: string) => void) => void
      checkNetworkStatus: () => Promise<CheckNetworkStatusResponse>
      writeHelloWorldTextFile: () => Promise<void>
      readHelloWorldTextFile: () => Promise<string>
    }
  }
}
