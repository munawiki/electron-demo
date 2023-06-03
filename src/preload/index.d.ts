import { ElectronAPI } from '@electron-toolkit/preload'
import { CheckNetworkStatusResponse, IGetOSInformations } from '../shared/node/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getOSInformations: () => Promise<IGetOSInformations>
      checkNetworkStatus: () => Promise<CheckNetworkStatusResponse>
      writeHelloWorldTextFile: () => Promise<string>
      readHelloWorldTextFile: () => Promise<string>
      crawlNews: () => Promise<string[]>
    }
  }
}
