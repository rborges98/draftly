export const socketEvents = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ROOM_COUNT: 'roomCount',
  JOIN_ROOM: 'joinRoom',
  UPDATE_CONTENT: 'updateContent',
  LEAVE_ROOM: 'leaveRoom'
} as const

export const socketStatus = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected'
} as const

export type SocketEvents = (typeof socketEvents)[keyof typeof socketEvents]
export type SocketStatus = (typeof socketStatus)[keyof typeof socketStatus]
