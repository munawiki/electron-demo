import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { CheckNetworkStatusResponse, IGetOSInformations } from '../shared/types'

// Custom APIs for renderer
const api = {
  getOSInformations: (): Promise<IGetOSInformations> => ipcRenderer.invoke('get-os-informations'),
  checkNetworkStatus: (): Promise<CheckNetworkStatusResponse> =>
    ipcRenderer.invoke('check-network-status'),
  writeHelloWorldTextFile: (): Promise<string> => ipcRenderer.invoke('write-file'),
  readHelloWorldTextFile: (): Promise<string> => ipcRenderer.invoke('read-file'),
  crawlNews: (): Promise<string[]> => ipcRenderer.invoke('crawl-news')
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
