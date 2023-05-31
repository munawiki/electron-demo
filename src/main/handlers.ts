import { IpcMainInvokeEvent } from 'electron'
import { checkNetworkStatus } from './network'
import { CheckNetworkStatusResponse } from '../shared/node/types'
import { readHelloWorldTextFile } from './file'

export const handleCheckNetworkStatus = (
  _event: IpcMainInvokeEvent
): CheckNetworkStatusResponse => {
  return checkNetworkStatus()
}

export const handleReadHelloWorldTextFile = async (_event: IpcMainInvokeEvent): Promise<string> => {
  return await readHelloWorldTextFile()
}
