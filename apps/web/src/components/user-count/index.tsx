'use client'

import { useEffect, useState } from 'react'
import Icon from '../icon'
import Socket from '@/services/socket'
import { socketEvents } from '@draftly/shared'

const UserCount = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    Socket.connect()
    Socket.listen({
      event: socketEvents.ROOM_COUNT,
      callback: ({ count }) => {
        console.log('Connected users:', count)
        setCount(count as number)
      }
    })
  }, [])

  return (
    <div className="flex items-center gap-1" title="active users">
      <Icon name={'users'} className="stroke-draftly-purple size-5" />
      <strong>{count}</strong>
    </div>
  )
}

export default UserCount
