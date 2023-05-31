import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      receiveValue: (callback: (params: string) => void) => void
    }
  }
}
