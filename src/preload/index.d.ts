import { ElectronAPI } from '@electron-toolkit/preload'
import { CheckNetworkStatusResponse, IGetOSInformations } from '../shared/node/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getOSInformations: (callback: (params: IGetOSInformations) => void) => void
      checkNetworkStatus: () => Promise<CheckNetworkStatusResponse>
      writeHelloWorldTextFile: () => Promise<string>
      readHelloWorldTextFile: () => Promise<string>
      crawlNews: () => Promise<string[]>
    }
  }
}
