'use client'

import { socketEvents, SocketStatus, socketStatus } from '@draftly/shared'
import Socket from '@/services/socket'
import { cn } from '@/utils'
import { useEffect, useState } from 'react'

const Status = () => {
  const [status, setStatus] = useState<SocketStatus>(socketStatus.DISCONNECTED)

  useEffect(() => {
    Socket.connect()
    Socket.listen({
      event: socketEvents.CONNECT,
      callback: () => {
        setStatus(socketStatus.CONNECTED)
        console.log('Socket.IO connection established')
      }
    })

    Socket.listen({
      event: socketEvents.JOIN_ROOM,
      callback: () => {
        setStatus(socketStatus.CONNECTED)
      }
    })

    Socket.listen({
      event: socketEvents.DISCONNECT,
      callback: () => {
        setStatus(socketStatus.DISCONNECTED)
        console.log('Socket.IO connection closed')
      }
    })
  }, [])

  return (
    <div className="flex items-center gap-1">
      <div
        className={cn(
          'size-3 rounded-full',
          status === socketStatus.CONNECTED ? 'bg-green-500' : 'bg-red-600'
        )}
      />
      <span className="text-sm text-gray-500 capitalize">{status}</span>
    </div>
  )
}

export default Status
