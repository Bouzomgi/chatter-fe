import { useRef } from 'react'
import useWebSocket from 'react-use-websocket'
import eventEmitter from 'src/services/EventEmitter'
import MessageNotificationPayload from 'chatter-be/src/websocket/MessageNotificationPayload'

interface WebSocketConnectionParams {
  url: string
}

export const useWebSocketConnection = ({ url }: WebSocketConnectionParams) => {
  const connectionAttempts = useRef(0)

  const maxConnectionAttempts = 3

  const { lastJsonMessage } = useWebSocket<MessageNotificationPayload>(url, {
    share: true,
    shouldReconnect: () => {
      connectionAttempts.current++
      console.log('connectionAttempts.current', connectionAttempts.current)

      if (connectionAttempts.current > maxConnectionAttempts) {
        const errorMessage = { error: 'Websocket connection failed' }
        eventEmitter.emit('unauthorized', errorMessage)
        return false // Stop attempting to reconnect
      }

      return true // Allow reconnection
    },
    onOpen: () => {
      console.log('WebSocket connection established')
      connectionAttempts.current = 0
    },
    onError: () => {
      console.error('WebSocket connection error')
      const errorMessage = { error: 'Websocket connection failed' }
      eventEmitter.emit('unauthorized', errorMessage)
    }
  })

  return {
    lastJsonMessage
  }
}
