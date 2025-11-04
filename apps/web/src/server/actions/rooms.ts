'use server'

import { connectToDatabase } from '@draftly/shared/db'
import Rooms from '@draftly/shared/db/models/rooms'

export const getRoom = async (roomId: string) => {
  try {
    await connectToDatabase()

    const room = await Rooms.findById({ _id: roomId }).lean()

    if (!room) {
      return { error: true, message: 'Room not found.' }
    }

    return { error: false, data: room }
  } catch (error) {
    console.error(error)
    return { error, message: 'Failed to join the room.' }
  }
}

export const createRoom = async (roomId: string) => {
  try {
    await connectToDatabase()

    await Rooms.create({ _id: roomId })

    return { error: false }
  } catch (error) {
    console.error(error)

    if (error.code === 11000) {
      return { error, message: 'This room already exists.' }
    }

    return { error, message: 'Failed to create the room.' }
  }
}
