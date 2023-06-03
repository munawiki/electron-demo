import { ElectronAPI } from '@electron-toolkit/preload'
import { NetworkStatus } from 'src/shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getOSInformations: () => Promise<IGetOSInformations>
      checkNetworkStatus: () => Promise<NetworkStatus>
      writeHelloWorldTextFile: () => Promise<string>
      readHelloWorldTextFile: () => Promise<string>
      crawlNews: () => Promise<string[]>
    }
  }
}
