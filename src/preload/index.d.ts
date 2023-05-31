import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getOSInformations: (callback: (params: string) => void) => void
    }
  }
}
