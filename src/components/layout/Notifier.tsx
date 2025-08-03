import { useEffect } from 'react'
import { useWebSocketConnection } from './socket/useWebSocketConnection'
import { useLocation } from 'react-router-dom'

function Notifier() {
  const { lastJsonMessage } = useWebSocketConnection({
    endpoint: '/ws/api/authed'
  })

  const location = useLocation() // Access the current route

  // Check if the tab is active or inactive
  const isTabInactive = () => document.hidden

  // Handle WebSocket messages
  useEffect(() => {
    if (lastJsonMessage) {
      if (isTabInactive() || location.pathname !== '/chatroom') {
        document.title = 'chatter!!!' // Change the title if the tab is inactive or on settings and a message arrives
      }
    }

    return () => {
      document.title = 'chatter'
    }
  }, [lastJsonMessage, location.pathname])

  return null
}

export default Notifier
