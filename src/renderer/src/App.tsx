import { Button, Divider } from 'antd'
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
  const [crawledData, setCrawledData] = useState<string[]>([])

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

  const handleCrawlNews = async (): Promise<void> => setCrawledData(await window.api.crawlNews())

  return (
    <div className="container">
      <div>
        <p>Framework: React</p>
      </div>
      <Divider />
      <div style={{ marginBottom: 10 }}>
        <pre>{osInfo}</pre>
      </div>
      <Divider />
      <div>
        <Button onClick={handleClickWriteTmpFile}>write /tmp file</Button>
        <Button onClick={handleClickReadTmpFile}>read /tmp file</Button>
        <p>filePath: {filePath}</p>
        <p>fileText: {fileText}</p>
      </div>
      <Divider />
      <div>
        <Button onClick={handleCrawlNews}>Crawl News</Button>
        {crawledData.length > 0 && (
          <ul>
            {crawledData.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ul>
        )}
      </div>
      <Divider />
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
