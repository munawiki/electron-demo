import net from 'net'

export const checkNetworkStatus = ({
  host,
  onOpen,
  onClose,
  onError
}: {
  host: string
  onOpen: () => void
  onClose: () => void
  onError: (error: Error) => void
}): void => {
  const socket = new net.Socket()

  socket.setTimeout(1000)

  socket.on('connect', () => {
    console.log(`${host}: ok`)
    onOpen()
    socket.destroy()
  })

  socket.on('timeout', () => {
    console.log(`${host}: timeout`)
    onError(new Error('timeout'))
    socket.destroy()
  })

  socket.on('error', (error) => {
    console.log(`${host}: ${error.message}`)
    onError(error)
    socket.destroy()
  })

  socket.on('close', () => {
    onClose()
    console.log(`${host}: close`)
  })

  socket.connect(80, host)
}
