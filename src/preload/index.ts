import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IGetOSInformations, NetworkStatus } from '../shared/types'
import io from 'socket.io-client'

// Socket.io

const socket = io('http://localhost:3000')

socket.on('connect', () => {
  console.log('connected')
})

socket.on('disconnect', () => {
  console.log('disconnected')
})

// Custom APIs for renderer
const api = {
  getOSInformations: (): Promise<IGetOSInformations> => ipcRenderer.invoke('get-os-informations'),
  checkNetworkStatus: (): Promise<NetworkStatus> => ipcRenderer.invoke('check-network-status'),
  readFile: (path: string): Promise<string[] | string> => ipcRenderer.invoke('read-file', path),
  writeFile: (path: string, content: string): Promise<void> =>
    ipcRenderer.invoke('write-file', path, content),
  crawlNews: (): Promise<string[]> => ipcRenderer.invoke('crawl-news'),
  getDynamicContents: (url: string): Promise<string> =>
    ipcRenderer.invoke('get-dynamic-contents', url),
  extractZip: (filePaths: string): Promise<string[]> =>
    ipcRenderer.invoke('extract-zip', filePaths),
  sendSocketMessage: (message: string): void => {
    socket.emit('chat message', message)
  },
  receiveSocketMessage: (callback: (message: string) => void): void => {
    socket.on('message', (message) => {
      callback(message)
    })
  }
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
