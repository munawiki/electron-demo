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
      <pre>{osInfo}</pre>
    </div>
  )
}

export default App
