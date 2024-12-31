import useWebSocket from 'react-use-websocket'
import { useEffect } from 'react'
import MessageNotificationPayload from 'chatter-be/src/websocket/MessageNotificationPayload'

function Notifier() {
  const { lastJsonMessage } = useWebSocket<MessageNotificationPayload>(
    `${process.env.REACT_APP_BACKEND_WEBSOCKET_ENDPOINT}/api/authed` || '',
    {
      share: true,
      shouldReconnect: () => true
    }
  )

  // Check if the tab is active or inactive
  const isTabInactive = () => document.hidden

  // Handle WebSocket messages
  useEffect(() => {
    if (lastJsonMessage && isTabInactive()) {
      document.title = 'chatter!!!' // Change the title if the tab is inactive and a message arrives
    }

    return () => {
      document.title = 'chatter'
    }
  }, [lastJsonMessage])

  return null
}

export default Notifier
