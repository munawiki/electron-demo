import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [osInfo, setOsInfo] = useState<string>('')

  useEffect(() => {
    window.api.receiveValue((value: string) => {
      setOsInfo(value)
    })
  }, [])

  return (
    <div className="container">
      <p>Framework: React</p>
      <div style={{ marginBottom: 10 }}>
        <pre>{osInfo}</pre>
      </div>
      <button>Check Network Status</button>
    </div>
  )
}

export default App
