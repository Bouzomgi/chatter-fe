import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import eventEmitter from '../../services/EventEmitter'
import LocalStorageService from '../../services/LocalStorageService'

export const ProtectedRoutes = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleUnauthorized = () => {
      console.log('unauthorized')
      navigate('/')
    }
    eventEmitter.on('unauthorized', handleUnauthorized)

    return () => {
      eventEmitter.off('unauthorized', handleUnauthorized)
    }
  }, [navigate])

  return LocalStorageService.areUserDetailsSet() ? (
    <Outlet />
  ) : (
    <Navigate to='/' replace={true} />
  )
}

export default ProtectedRoutes
