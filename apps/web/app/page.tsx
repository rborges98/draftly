import * as Cards from '@/components/cards'
import Icon from '@/components/icon'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-2xl p-8">
        <h1 className="text-draftly-purple mb-2 flex justify-center gap-2 text-center text-3xl font-bold">
          <Icon
            name="pen"
            className="lucide lucide-pencil text-draftly-purple size-8"
          />
          Draftly
        </h1>
        <p className="bg-pu mb-10 text-center text-gray-600">
          A collaborative space where ideas flow freely in real-time.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Cards.Create />
          <Cards.Join />
        </div>

        <p className="mt-10 text-center text-sm text-gray-400">
          No login required. All users are anonymous. <br />
          Changes are synced in real-time across all participants.
        </p>
      </div>
    </div>
  )
}
