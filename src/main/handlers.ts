import { IpcMainEvent } from 'electron'
import { checkNetworkStatus } from './network'

export const handleCheckStatus = (
  _event: IpcMainEvent,
  {
    host,
    onOpen,
    onError,
    onClose
  }: {
    host: string
    onOpen: () => void
    onError: (error: Error) => void
    onClose: () => void
  }
): void => {
  checkNetworkStatus({
    host,
    onOpen,
    onError,
    onClose
  })
}
