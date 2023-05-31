import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [osInfo, setOsInfo] = useState<string>('')
  const [networkStatus, setNetworkStatus] = useState<{
    status: boolean
    networkInterfaces: string
  }>()

  useEffect(() => {
    window.api.getOSInformations(setOsInfo)

    const interval = setInterval(async () => {
      const networkStatus = await window.api.checkNetworkStatus()

      console.log(networkStatus)
      setNetworkStatus({
        status: networkStatus.status,
        networkInterfaces: JSON.stringify(networkStatus.networkInterfaces, null, 2)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container">
      <div>
        <p>Framework: React</p>
      </div>
      <hr />
      <div style={{ marginBottom: 10 }}>
        <pre>{osInfo}</pre>
      </div>
      <hr />
      <div>
        <p>Network status: {networkStatus?.status ? 'online' : 'offline'}</p>
        <pre>{networkStatus?.networkInterfaces}</pre>
      </div>
    </div>
  )
}

export default App
