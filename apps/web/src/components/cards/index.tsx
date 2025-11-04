'use client'

import { cn } from '@/utils'
import { useActionState } from 'react'

import { createRoom, getRoom } from '@/server/actions/rooms'
import { useRouter } from 'next/navigation'
import Loading from '../loading'

export const Create = () => {
  const router = useRouter()
  const [errorMessage, formAction, isLoading] = useActionState(
    handleClick,
    null
  )

  async function handleClick(_: unknown, formData: FormData) {
    const randomRoomId = Math.random().toString(36).substring(2, 10)
    const inputData = formData.get('roomId') as string

    const roomId = inputData || randomRoomId

    const { error, message } = await createRoom(roomId)

    if (error) {
      return message
    }

    router.push('/room/' + roomId)
  }

  return (
    <form
      action={formAction}
      className="bg-draftly-purple flex flex-col justify-between rounded-xl p-6 text-white shadow-md"
    >
      <div>
        <h2 className="mb-4 text-center text-xl font-semibold md:text-left">
          Create a Room
        </h2>
        <p className="pb-2 text-center text-sm md:text-left">
          Start a new collaborative space with a unique ID
        </p>
        <input
          type="text"
          name="roomId"
          placeholder="Enter room ID"
          className={cn(
            'mb-1 w-full rounded-md bg-white p-3 text-black focus:ring-1 focus:ring-white focus:outline-none',
            errorMessage && 'ring-2 ring-red-600'
          )}
        />
        {errorMessage && (
          <small className="block text-red-600">*{errorMessage}</small>
        )}
        <small className="leading-px">
          *If left blank, a random room ID will be generated
        </small>
      </div>
      <button
        type="submit"
        className="mt-5 cursor-pointer rounded-lg bg-white px-6 py-3 text-center text-lg text-black transition hover:bg-gray-100"
        disabled={isLoading}
      >
        {isLoading ? <Loading /> : 'Create New Room'}
      </button>
    </form>
  )
}

export const Join = () => {
  const [errorMessage, formAction, isLoading] = useActionState(
    handleClick,
    null
  )

  const router = useRouter()

  async function handleClick(_: unknown, formData: FormData) {
    const roomId = formData.get('roomId') as string
    const { error, message } = await getRoom(roomId)

    if (error) {
      return message
    }

    router.push('/room/' + roomId)
  }

  return (
    <form
      action={formAction}
      className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-md"
    >
      <h2 className="mb-4 text-center text-xl font-semibold md:text-left">
        Join a Room
      </h2>
      <p className="mb-2 text-center text-sm text-gray-500 md:text-left">
        Enter an existing room ID to collaborate
      </p>
      <div className="flex h-full flex-col justify-between">
        <input
          type="text"
          name="roomId"
          placeholder="Enter room ID"
          required
          className={cn(
            'peer focus:ring-draftly-purple w-full rounded-md p-3 ring-1 ring-gray-500 focus:outline-none',
            errorMessage && 'ring-2 ring-red-600'
          )}
        />
        {errorMessage && (
          <small className="block h-full pt-2 text-red-600">
            *{errorMessage}
          </small>
        )}
        <button
          type="submit"
          className={cn(
            'peer-valid:bg-draftly-purple pointer-events-none mt-4 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gray-500 px-6 py-3 text-lg text-white transition peer-valid:pointer-events-auto peer-valid:cursor-pointer hover:bg-purple-600'
          )}
        >
          {isLoading ? <Loading color="white" /> : 'Join Room →'}
        </button>
      </div>
    </form>
  )
}
