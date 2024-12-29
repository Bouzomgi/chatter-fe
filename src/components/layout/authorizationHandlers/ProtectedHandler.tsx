import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LocalStorageService from 'src/services/LocalStorageService'
import eventEmitter from 'src/services/EventEmitter'

/*
  Handles routes that are protected
  If the route is protected, ensure that the user is logged in at all times
*/
const AuthorizedHandler = () => {
  const navigate = useNavigate()

  const handleUnauthorized = () => {
    if (!LocalStorageService.areUserDetailsSet()) {
      console.log('User is unauthorized')
      navigate('/')
    }
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', handleUnauthorized)
    document.addEventListener('focus', handleUnauthorized)
    eventEmitter.on('unauthorized', () => navigate('/'))

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleUnauthorized)
      document.removeEventListener('focus', handleUnauthorized)
      eventEmitter.off('unauthorized')
    }
  }, [])

  return null
}

export default AuthorizedHandler
