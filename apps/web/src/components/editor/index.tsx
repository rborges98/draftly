'use client'

import { useEffect, useRef } from 'react'
import Socket from '@/services/socket'
import { useParams } from 'next/navigation'
import 'quill/dist/quill.snow.css'
import { Delta } from 'quill'
import { socketEvents } from '@draftly/shared'

const toolbarOptions = [
  [
    { font: [] },
    { color: [] },
    { background: [] },
    { size: [] },
    { align: [] }
  ],
  [
    'bold',
    'italic',
    'underline',
    'strike',
    { list: 'ordered' },
    { list: 'bullet' },
    { list: 'check' },
    { header: 1 },
    { header: 2 },
    { indent: '-1' },
    { indent: '+1' },
    { script: 'sub' },
    { script: 'super' },
    'blockquote',
    'code-block',
    {},
    'clean'
  ]
  // ['link', 'image', 'video', 'formula'],
]

export default function Editor() {
  const quillRef = useRef<unknown>(null)
  const { roomId } = useParams()

  useEffect(() => {
    const loadEditor = async () => {
      const Quill = (await import('quill')).default

      const quill = new Quill('#editor', {
        theme: 'snow',
        modules: { toolbar: toolbarOptions }
      })

      quillRef.current = quill

      Socket.connect()
      Socket.send({ event: socketEvents.JOIN_ROOM, data: { roomId } })

      quill.on('text-change', (delta, _, source) => {
        if (source !== 'user') return

        Socket.send({
          event: socketEvents.UPDATE_CONTENT,
          data: { roomId, delta }
        })
      })

      Socket.listen({
        event: socketEvents.UPDATE_CONTENT,
        callback: ({ delta }) => {
          quill.updateContents(delta as Delta)
        }
      })
    }

    loadEditor()
    return () => {
      Socket.send({ event: socketEvents.LEAVE_ROOM, data: { roomId } })
    }
  }, [])

  return (
    <div className="[&_.ql-toolbar]:border-draftly-purple size-full overflow-y-hidden [&_.ql-formats]:!flex [&_.ql-formats]:first:!mr-0 [&_.ql-formats]:last:overflow-x-auto [&_.ql-formats]:last:overflow-y-hidden md:[&_.ql-formats]:!inline-block [&_.ql-toolbar]:!border-t-0 [&_.ql-toolbar]:!border-r-0 [&_.ql-toolbar]:!border-l-0">
      <div id="editor" className="min-h-full !border-none p-3 outline-none" />
    </div>
  )
}
