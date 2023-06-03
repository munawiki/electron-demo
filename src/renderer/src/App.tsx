import { Divider } from 'antd'
import { useEffect, useState } from 'react'
import { IGetOSInformations } from 'src/shared/types'

function App(): JSX.Element {
  const [osInfo, setOsInfo] = useState<IGetOSInformations>()

  useEffect(() => {
    ;(async (): Promise<void> => {
      const response = await window.api.getOSInformations()
      setOsInfo(response)
    })()
  }, [])
  console.log(osInfo)

  return (
    <div className="container">
      <h1>Electron + React + Typescript + Vite</h1>
      <Divider />
      {osInfo && (
        <>
          <h2>OS Informations</h2>
          <p>Arch: {osInfo.arch}</p>
          <p>Platform: {osInfo.platform}</p>
          <p>Release: {osInfo.release}</p>
          <p>Uptime: {osInfo.uptime}</p>
          <p>Total Memory: {osInfo.totalmem}</p>
          <p>Free Memory: {osInfo.freemem}</p>
          <p>Home Dir: {osInfo.homedir}</p>
          <p>Temp Dir: {osInfo.tmpdir}</p>
          <p>Hostname: {osInfo.hostname}</p>
          <p>Endianness: {osInfo.endianness}</p>
          <p>Type: {osInfo.type}</p>
          <p>Load Avg: {osInfo.loadavg}</p>
          <>CPU: {osInfo.cpus[0].model}</>
        </>
      )}
    </div>
  )
}

export default App
