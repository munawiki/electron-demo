import os from 'os'

export interface CheckNetworkStatusResponse {
  status: boolean
  networkInterfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]>
}
