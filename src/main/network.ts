import os from 'os'
import { CheckNetworkStatusResponse } from '../shared/node/types'

export const checkNetworkStatus = (): CheckNetworkStatusResponse => {
  const networkInterfaces = os.networkInterfaces()

  const isOnline = Object.values(networkInterfaces).some((interfaces) =>
    interfaces?.some(
      (interfaceObject) =>
        !interfaceObject.internal && // 내부 네트워크 인터페이스 제외
        interfaceObject.address !== '127.0.0.1' && // 로컬 호스트 제외
        interfaceObject.family !== 'IPv6' && // IPv6 제외
        interfaceObject.mac !== '00:00:00:00:00:00' // 가상 네트워크 인터페이스 제외
    )
  )

  return {
    status: isOnline,
    networkInterfaces
  }
}
