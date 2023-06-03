import os from 'os'

export interface NetworkStatus {
  isOnline: boolean
  isReachable: boolean
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
