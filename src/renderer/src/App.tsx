import { Button, Divider } from 'antd'
import { useEffect, useState } from 'react'

function App(): JSX.Element {
  // const [osInfo, setOsInfo] = useState<string>('')
  // const [networkStatus, setNetworkStatus] = useState<{
  //   status: boolean
  //   networkInterfaces: string
  // }>()

  // const [fileLoading, setFileLoading] = useState<boolean>(false)
  // const [fileText, setFileText] = useState<string>('')
  // const [filePath, setFilePath] = useState<string>('')
  // const [crawledData, setCrawledData] = useState<string[]>([])

  // useEffect(() => {
  //   window.api.getOSInformations(setOsInfo)

  //   const interval = setInterval(async () => {
  //     const networkStatus = await window.api.checkNetworkStatus()

  //     setNetworkStatus({
  //       status: networkStatus.status,
  //       networkInterfaces: JSON.stringify(networkStatus.networkInterfaces, null, 2)
  //     })
  //   }, 1000)

  //   return () => clearInterval(interval)
  // }, [])

  // const handleClickWriteTmpFile = async (): Promise<void> => {
  //   setFileLoading(true)
  //   setFilePath(await window.api.writeHelloWorldTextFile())
  //   setFileLoading(false)
  // }

  // const handleClickReadTmpFile = async (): Promise<void> => {
  //   setFileLoading(true)
  //   setFileText(await window.api.readHelloWorldTextFile())
  //   setFileLoading(false)
  // }

  // const handleCrawlNews = async (): Promise<void> => setCrawledData(await window.api.crawlNews())

  return <div className="container"></div>
}

export default App
