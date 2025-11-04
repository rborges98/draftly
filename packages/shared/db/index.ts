import 'dotenv/config'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI não está definida nas variáveis de ambiente')
}

let conn: typeof mongoose

export async function connectToDatabase() {
  if (!conn) {
    conn = await mongoose.connect(MONGODB_URI)
  }

  return conn
}
