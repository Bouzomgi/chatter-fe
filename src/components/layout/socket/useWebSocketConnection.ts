import { useRef } from 'react'
import useWebSocket from 'react-use-websocket'
import eventEmitter from '@src/services/EventEmitter'
import type { MessageNotificationPayload } from 'chatter-be/src/websocket/MessageNotificationPayload'

interface WebSocketConnectionParams {
  endpoint: string
}

export const useWebSocketConnection = ({
  endpoint
}: WebSocketConnectionParams) => {
  const connectionAttempts = useRef(0)

  const maxConnectionAttempts = 3

  const wsUrl =
    (location.protocol === 'https:' ? 'wss://' : 'ws://') +
    location.host +
    endpoint

  const { lastJsonMessage } = useWebSocket<MessageNotificationPayload>(wsUrl, {
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
    onClose: () => {
      console.log('WebSocket connection closed')
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
