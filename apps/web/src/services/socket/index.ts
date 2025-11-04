import { SocketEvents } from '@draftly/shared'
import { Delta } from 'quill'
import { io, Socket as SocketType } from 'socket.io-client'

type SendProps = { event: SocketEvents; data: unknown }

type ListenCallbackProps = { delta?: Delta; count?: number }
type ListenProps = {
  event: SocketEvents
  callback: (data: ListenCallbackProps) => void
}

let socket: SocketType

const connect = () => {
  const SOCKET_URI = process.env.NEXT_PUBLIC_SOCKET_URI

  if (!socket) {
    socket = io(SOCKET_URI)
  }

  return socket
}

export const send = ({ event, data }: SendProps) => {
  if (!socket) {
    console.log('Socket.IO is not connected')
    return
  }

  socket.emit(event, data)
}

const listen = ({ event, callback }: ListenProps) => {
  if (!socket) {
    console.log('Socket.IO is not connected')
    return
  }

  socket.on(event, callback)
}

const Socket = { connect, send, listen }
export default Socket
