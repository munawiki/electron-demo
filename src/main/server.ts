import cors from 'cors'
import { Server } from 'socket.io'
import express from 'express'

const server = express()

server.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

const httpServer = server.listen(3000, () => {
  console.log('Server is running on port 3000')
})

const io = new Server(httpServer)

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('chat message', (msg) => {
    io.emit('message', msg)
  })
})
