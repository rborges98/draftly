import Editor from '@/components/editor'
import Icon from '@/components/icon'
import Status from '@/components/status'
import UserCount from '@/components/user-count'
import { getRoom } from '@/server/actions/rooms'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params
}: {
  params: Promise<{ roomId: string }>
}) {
  return {
    title: `Room ${params.id} — Draftly`,
    description: 'Collaborate in real-time with your team on Draftly.'
  }
}

const Page = async ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { roomId } = await params

  const { data: room } = await getRoom(roomId)

  if (!room) {
    notFound()
  }

  return (
    <main className="flex h-screen flex-col gap-6 pb-10 sm:gap-10">
      <header className="flex h-14 items-center justify-between bg-white px-4 shadow sm:px-10">
        <div className="flex items-center gap-5 sm:gap-7">
          <Link href="/">
            <Icon
              name="arrow"
              className="size-5 rotate-180 hover:scale-110 sm:size-6"
            />
          </Link>
          <h1 className="text-lg font-bold">Draftly</h1>
        </div>
        <div className="flex gap-5 sm:gap-7">
          <Status />
          <UserCount />
        </div>
      </header>
      <section className="mx-auto flex w-11/12 flex-1 flex-col overflow-hidden rounded-lg bg-white p-3 shadow sm:p-6">
        <div className="flex-1 overflow-auto">
          <Editor />
        </div>
      </section>
    </main>
  )
}

export default Page
