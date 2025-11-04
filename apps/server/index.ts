import 'dotenv/config'
import http from 'http'
import cors from 'cors'
import express from 'express'
import Delta from 'quill-delta'
import { Server, Socket } from 'socket.io'
import { socketEvents } from '@draftly/shared'
import Rooms from '@draftly/shared/db/models/rooms'
import { connectToDatabase } from '@draftly/shared/db'

type Buffer = {
  [key: string]: Delta
}

type Event = { roomId: string }
type UpdateContentEvent = Event & { delta: Delta }

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

app.use(cors())

const buffer: Buffer = {}

io.on(socketEvents.CONNECT, (socket) => {
  let currentRoomId: string

  connectToDatabase()

  console.log(`User connected: ${socket.id}`)

  socket.on(socketEvents.JOIN_ROOM, async ({ roomId }: Event) => {
    socket.join(roomId)
    currentRoomId = roomId

    const sockets = await io.in(currentRoomId).fetchSockets()
    io.to(roomId).emit(socketEvents.ROOM_COUNT, { count: sockets.length })

    const room = await Rooms.findById({ _id: roomId })
    const roomContent = new Delta(buffer[roomId] || room.content)

    if (!buffer[roomId]) {
      buffer[roomId] = roomContent
    }

    socket.emit(socketEvents.UPDATE_CONTENT, { delta: roomContent })
    socket.emit(socketEvents.JOIN_ROOM)

    console.log(`User ${socket.id} joined room: ${roomId}`)
  })

  socket.on(
    socketEvents.UPDATE_CONTENT,
    ({ roomId, delta }: UpdateContentEvent) => {
      const currentData = buffer[roomId]
      const updatedData = currentData.compose(delta)

      buffer[roomId] = updatedData

      socket.to(roomId).emit(socketEvents.UPDATE_CONTENT, { delta })
    }
  )

  socket.on(socketEvents.LEAVE_ROOM, ({ roomId }: Event) => {
    handleLeaveRoom(roomId, socket)

    console.log(`User ${socket.id} left room: ${roomId}`)
  })

  socket.on(socketEvents.DISCONNECT, async () => {
    handleLeaveRoom(currentRoomId, socket)
    console.log(`User disconnected: ${socket.id}`)
  })
})

server.listen(8080, () => {
  console.log('Socket.IO server running on port 8080')
})

async function handleLeaveRoom(roomId: string, socket: Socket) {
  const sockets = await io.in(roomId).fetchSockets()
  const roomCount = sockets.length - 1

  if (buffer[roomId]) {
    await Rooms.findByIdAndUpdate(roomId, {
      content: buffer[roomId]
    })

    if (roomCount === 0) {
      delete buffer[roomId]

      console.log(`Room ${roomId} saved to database and removed from buffer.`)
    }
  }

  io.to(roomId).emit(socketEvents.ROOM_COUNT, { count: roomCount })
  socket.leave(roomId)
}
