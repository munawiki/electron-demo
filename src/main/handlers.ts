import { IpcMainInvokeEvent } from 'electron'
import { checkNetworkStatus } from './network'
import { CheckNetworkStatusResponse } from '../shared/node/types'

export const handleCheckNetworkStatus = (
  _event: IpcMainInvokeEvent
): CheckNetworkStatusResponse => {
  return checkNetworkStatus()
}
