import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [osInfo, setOsInfo] = useState<string>('')
  const [networkStatus, setNetworkStatus] = useState<{
    status: boolean
    networkInterfaces: string
  }>()

  const [fileLoading, setFileLoading] = useState<boolean>(false)
  const [fileText, setFileText] = useState<string>('')
  const [filePath, setFilePath] = useState<string>('')
  const [crawledData, setCrawledData] = useState<string[]>('')

  useEffect(() => {
    window.api.getOSInformations(setOsInfo)

    const interval = setInterval(async () => {
      const networkStatus = await window.api.checkNetworkStatus()

      setNetworkStatus({
        status: networkStatus.status,
        networkInterfaces: JSON.stringify(networkStatus.networkInterfaces, null, 2)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleClickWriteTmpFile = async (): Promise<void> => {
    setFileLoading(true)
    setFilePath(await window.api.writeHelloWorldTextFile())
    setFileLoading(false)
  }

  const handleClickReadTmpFile = async (): Promise<void> => {
    setFileLoading(true)
    setFileText(await window.api.readHelloWorldTextFile())
    setFileLoading(false)
  }

  const handleCrawlLOL = async (): Promise<void> => {
    setCrawledData(await window.api.crawlLOL())
  }

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
        <button onClick={handleClickWriteTmpFile}>write /tmp file</button>
        <button onClick={handleClickReadTmpFile}>read /tmp file</button>
        <p>filePath: {filePath}</p>
        <p>fileText: {fileText}</p>
      </div>
      <hr />
      <div>
        <button onClick={handleCrawlLOL}>Crawl LOL</button>
        {crawledData.length > 0 && (
          <ul>
            {crawledData.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ul>
        )}
      </div>
      <hr />
      <div>
        {fileLoading ? (
          <p>Loading...</p>
        ) : (
          <p>
            Network status:{' '}
            {networkStatus?.status ? (
              <span style={{ color: 'green' }}>online</span>
            ) : (
              <span style={{ color: 'red' }}>offline</span>
            )}
          </p>
        )}
        <pre>{networkStatus?.networkInterfaces}</pre>
      </div>
    </div>
  )
}

export default App
