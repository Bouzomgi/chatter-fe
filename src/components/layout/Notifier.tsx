// src/components/Notifier.tsx

import { useEffect } from 'react'
import { useWebSocketConnection } from './socket/useWebSocketConnection'

function Notifier() {
  const { lastJsonMessage } = useWebSocketConnection({
    url: `${process.env.REACT_APP_BACKEND_WEBSOCKET_ENDPOINT}/api/authed`
  })

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
