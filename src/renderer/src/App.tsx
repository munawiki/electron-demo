import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [osInfo, setOsInfo] = useState<string>('')
  const [networkStatus, setNetworkStatus] = useState<boolean>(false)

  useEffect(() => {
    window.api.getOSInformations(setOsInfo)

    const interval = setInterval(async () => {
      const networkStatus = await window.api.checkNetworkStatus()
      setNetworkStatus(networkStatus)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container">
      <p>Framework: React</p>
      <div style={{ marginBottom: 10 }}>
        <pre>{osInfo}</pre>
      </div>
      <div>
        <p>Network status: {networkStatus ? 'online' : 'offline'}</p>
      </div>
    </div>
  )
}

export default App
