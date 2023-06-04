import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IGetOSInformations, NetworkStatus } from '../shared/types'

// Custom APIs for renderer
const api = {
  getOSInformations: (): Promise<IGetOSInformations> => ipcRenderer.invoke('get-os-informations'),
  checkNetworkStatus: (): Promise<NetworkStatus> => ipcRenderer.invoke('check-network-status'),
  readFile: (path: string): Promise<string[] | string> => ipcRenderer.invoke('read-file', path)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
