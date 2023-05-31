import { IpcMainInvokeEvent } from 'electron'
import { checkNetworkStatus } from './network'
import { CheckNetworkStatusResponse } from '../shared/node/types'
import { readHelloWorldTextFile, writeHelloWorldTextFile } from './file'
import { crawlLOL } from './crawl'

export const handleCheckNetworkStatus = (
  _event: IpcMainInvokeEvent
): CheckNetworkStatusResponse => {
  return checkNetworkStatus()
}

export const handleWriteHelloWorldTextFile = async (
  _event: IpcMainInvokeEvent
): Promise<string> => {
  return await writeHelloWorldTextFile()
}

export const handleReadHelloWorldTextFile = async (_event: IpcMainInvokeEvent): Promise<string> => {
  return await readHelloWorldTextFile()
}

export const handleCrawlLOL = async (_event: IpcMainInvokeEvent): Promise<string[]> => {
  return await crawlLOL()
}
