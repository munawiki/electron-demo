import net from 'net'
import { NetworkStatus } from '../shared/types'

export const checkNetworkStatus = (): Promise<NetworkStatus> => {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ port: 80, host: 'www.google.com' })

    socket.on('connect', () => {
      socket.end()
      resolve({ isOnline: true, isReachable: true })
    })

    socket.on('error', () => {
      socket.destroy()
      resolve({ isOnline: true, isReachable: false })
    })

    socket.setTimeout(5000, () => {
      socket.destroy()
      resolve({ isOnline: false, isReachable: false })
    })
  })
}
