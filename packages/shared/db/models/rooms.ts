import { Schema, InferSchemaType, model, models } from 'mongoose'

const roomSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 1d
  },
  content: {
    type: Schema.Types.Mixed,
    default: { ops: [] }
  }
})

export type Room = InferSchemaType<typeof roomSchema>

const Rooms = models.rooms || model('rooms', roomSchema)

export default Rooms
