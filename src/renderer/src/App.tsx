import { Button, Col, Divider, Input, Row, Space, Typography, Upload } from 'antd'
import { UploadChangeParam } from 'antd/es/upload'
import { useEffect, useState } from 'react'
import { IGetOSInformations, NetworkStatus } from 'src/shared/types'
import { openDB } from 'idb'

function App(): JSX.Element {
  const [osInfo, setOsInfo] = useState<IGetOSInformations>()
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>()
  const [files, setFiles] = useState<string[] | string>()
  const [filePath, setFilePath] = useState<string>()
  const [news, setNews] = useState<string[]>()
  const [dynamicContent, setDynamicContent] = useState<string>()
  const [extractedFiles, setExtractedFiles] = useState<string[]>([])
  const [dbData, setDbData] = useState<string>()

  const getOSInformations = async (): Promise<void> => {
    const response = await window.api.getOSInformations()
    setOsInfo(response)
  }

  const checkNetworkStatus = async (): Promise<void> => {
    const response = await window.api.checkNetworkStatus()
    setNetworkStatus(response)
  }

  const readFile = async (path: string): Promise<void> => {
    const response = await window.api.readFile(path)
    setFiles(response)
  }

  const onDirectorySearch = async (path: string): Promise<void> => {
    setFilePath(path)

    try {
      await readFile(path)
    } catch (error) {
      console.log(error)
    }
  }

  const onWirteFileSearch = async (content: string): Promise<void> => {
    if (!filePath) throw new Error('File path is not defined')

    try {
      await window.api.writeFile(filePath, content)
      await readFile(filePath)
    } catch (error) {
      console.log(error)
    }
  }

  const crawlNews = async (): Promise<void> => {
    const response = await window.api.crawlNews()
    setNews(response)
  }

  const getDynamicContent = async (url: string): Promise<void> => {
    const response = await window.api.getDynamicContents(url)
    setDynamicContent(response)
  }

  const onFileUploadChange = async (info: UploadChangeParam): Promise<void> => {
    const { file } = info
    const { originFileObj } = file

    if (!originFileObj) throw new Error('File is not defined')

    try {
      const extractedFiles = await window.api.extractZip(originFileObj.path)
      setExtractedFiles(extractedFiles)
    } catch (error) {
      console.log(error)
    }
  }

  const addData = async (data: string): Promise<void> => {
    const db = await openDB('test-db', 1, {
      upgrade(db) {
        db.createObjectStore('keyval')
      }
    })

    await db.put('keyval', data, 'hello')
  }

  const readData = async (): Promise<string | undefined> => {
    const db = await openDB('test-db', 1, {
      upgrade(db) {
        db.createObjectStore('keyval')
      }
    })

    const data = await db.get('keyval', 'hello')
    return data
  }

  const handleClickReadData = async (): Promise<void> => {
    setDbData(await readData())
  }

  const handleClickAddData = async (data: string): Promise<void> => {
    await addData(data)
  }

  const handleClickDownload = (): void => {
    const aTag = document.createElement('a')

    aTag.href =
      'https://az764295.vo.msecnd.net/stable/b3e4e68a0bc097f0ae7907b217c1119af9e03435/VSCode-darwin-arm64.zip'
    aTag.download = 'VSCode-darwin-arm64.zip'

    aTag.click()
  }

  const handleSendMessage = (chatMessage: string): void => {
    window.api.sendSocketMessage(chatMessage)
  }

  useEffect(() => {
    const getOSInformationInterval = setInterval(() => {
      getOSInformations()
    }, 1000)

    checkNetworkStatus()

    const checkNetworkStatusInterval = setInterval(() => {
      checkNetworkStatus()
    }, 5000)

    crawlNews()
    getDynamicContent('https://blog.munawiki.dev/')

    window.api.receiveSocketMessage((message: string) => {
      console.log(message)
    })

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
          <Row gutter={16} style={{ width: '100%' }}>
            <Col span={8}>
              <Input.Search
                placeholder="Enter a path"
                enterButton="Read"
                onSearch={onDirectorySearch}
              />
            </Col>
            <Col span={16}>
              <Input.Search
                placeholder="Enter a Contents"
                enterButton="Write"
                onSearch={onWirteFileSearch}
              />
            </Col>
          </Row>
          <Space direction="vertical">
            {typeof files === 'string' ? (
              <Typography.Text>{files}</Typography.Text>
            ) : (
              files?.map((file) => <Typography.Text key={file}>{file}</Typography.Text>)
            )}
          </Space>
          <Divider />
          <h2>Crawl News</h2>
          <Space direction="vertical">
            {news?.map((item) => (
              <Typography.Text key={item}>{item}</Typography.Text>
            ))}
          </Space>
          <Divider />
          <h2>Dynamic Import</h2>
          <iframe
            srcDoc={dynamicContent}
            style={{ width: '100%', height: '500px', border: 'none' }}
          />
          <Divider />
          <h2>Decompress Zip</h2>
          <Upload.Dragger name="file" multiple onChange={onFileUploadChange}>
            <p className="ant-upload-drag-icon">Drag & Drop</p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Upload.Dragger>
          <Space direction="vertical">
            {extractedFiles?.map((file) => (
              <Typography.Text key={file}>{file}</Typography.Text>
            ))}
          </Space>
          <Divider />
          <h2>IndexedDB</h2>
          <Space direction="vertical">
            <Input.Search
              placeholder="Enter a Contents"
              enterButton="Add"
              onSearch={handleClickAddData}
            />
            <Button onClick={handleClickReadData}>Read</Button>
            <Typography.Text>{dbData}</Typography.Text>
          </Space>
          <Divider />
          <h2>Chrome Background Service</h2>
          <button onClick={handleClickDownload}>download</button>
          <Divider />
          <h2>Websocket Chat</h2>
          <Input.Search
            placeholder="Enter a Contents"
            enterButton="Send"
            onSearch={handleSendMessage}
          />
        </>
      )}
    </div>
  )
}

export default App
