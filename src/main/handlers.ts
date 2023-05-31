import { IpcMainInvokeEvent } from 'electron'
import { checkNetworkStatus } from './network'

export const handleCheckNetworkStatus = (_event: IpcMainInvokeEvent): boolean => {
  return checkNetworkStatus()
}
