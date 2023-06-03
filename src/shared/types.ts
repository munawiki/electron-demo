import os from 'os'

export interface CheckNetworkStatusResponse {
  status: boolean
  networkInterfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]>
}

export interface IGetOSInformations {
  arch: string
  cpus: os.CpuInfo[]
  endianness: string
  freemem: number
  homedir: string
  hostname: string
  loadavg: number[]
  platform: string
  release: string
  tmpdir: string
  totalmem: number
  type: string
  uptime: number
}
