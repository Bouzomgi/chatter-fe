import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LocalStorageService from 'src/services/LocalStorageService'

/*
  Handles standard routes
  If the route is standard, logged in users should go straight to the chat route
*/
const StandardHandler = () => {
  const navigate = useNavigate()

  const handleAuthorized = () => {
    if (LocalStorageService.areUserDetailsSet()) {
      navigate('/chatroom')
    }
  }

  useEffect(() => {
    handleAuthorized()

    document.addEventListener('visibilitychange', handleAuthorized)
    document.addEventListener('focus', handleAuthorized)

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleAuthorized)
      document.removeEventListener('focus', handleAuthorized)
    }
  }, [])

  return null
}

export default StandardHandler
