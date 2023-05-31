import os from 'os'

export const getOSInformations = (): string => {
  return `
OS: ${os.type()} ${os.release()} ${os.arch()} 
CPU: ${os.cpus()[0].model} ${os.cpus().length} x ${os.cpus()[0].speed} MHz 
Memory: ${Math.round(os.totalmem() / 1024 / 1024)} MB 
`
}
