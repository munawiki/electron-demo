import { ElectronAPI } from '@electron-toolkit/preload'
import { NetworkStatus } from 'src/shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getOSInformations: () => Promise<IGetOSInformations>
      checkNetworkStatus: () => Promise<NetworkStatus>
      readFile: (path: string) => Promise<string[] | string>
      writeFile: (path: string, content: string) => Promise<void>
    }
  }
}
