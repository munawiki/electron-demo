import { Divider, Input, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { IGetOSInformations, NetworkStatus } from 'src/shared/types'

function App(): JSX.Element {
  const [osInfo, setOsInfo] = useState<IGetOSInformations>()
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>()
  const [files, setFiles] = useState<string[] | string>()

  const getOSInformations = async (): Promise<void> => {
    const response = await window.api.getOSInformations()
    setOsInfo(response)
  }

  const checkNetworkStatus = async (): Promise<void> => {
    const response = await window.api.checkNetworkStatus()
    setNetworkStatus(response)
  }

  const onDirectorySearch = async (url: string): void => {
    try {
      const response = await window.api.readFile(url)
      setFiles(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getOSInformationInterval = setInterval(() => {
      getOSInformations()
    }, 1000)

    checkNetworkStatus()

    const checkNetworkStatusInterval = setInterval(() => {
      checkNetworkStatus()
    }, 5000)

    return () => {
      clearInterval(getOSInformationInterval)
      clearInterval(checkNetworkStatusInterval)
    }
  }, [])

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

      <Divider />

      {networkStatus && (
        <>
          <h2>Network Status</h2>
          <p>
            Is Online:{' '}
            {networkStatus.isOnline ? (
              <Typography.Text type="success">Yes</Typography.Text>
            ) : (
              <Typography.Text type="danger">No</Typography.Text>
            )}
          </p>
          <p>
            Is Reachable:{' '}
            {networkStatus.isReachable ? (
              <Typography.Text type="success">Yes</Typography.Text>
            ) : (
              <Typography.Text type="danger">No</Typography.Text>
            )}
          </p>
          <Divider />
          <h2>File Read / Write</h2>
          <Input.Search
            placeholder="Enter a path"
            enterButton="Read"
            onSearch={onDirectorySearch}
          />
          <Space direction="vertical">
            {typeof files === 'string' ? (
              <Typography.Text>{files}</Typography.Text>
            ) : (
              files?.map((file) => <Typography.Text key={file}>{file}</Typography.Text>)
            )}
          </Space>
        </>
      )}
    </div>
  )
}

export default App
