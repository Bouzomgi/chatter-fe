import { Navigate, Outlet } from 'react-router-dom'
import LocalStorageService from '../../services/LocalStorageService'
import ProtectedHandler from './authorizationHandlers/ProtectedHandler'

/*
  We could just let the ProtectedHandler deal with kicking any unauthed users
  out. But if we do it this way with a little bit of duplicated logic, an
  unauthorized user won't even hit the protected page at all. 
*/
export const ProtectedRoutes = () =>
  LocalStorageService.areUserDetailsSet() ? (
    <>
      <ProtectedHandler />
      <Outlet />
    </>
  ) : (
    <Navigate to='/' replace={true} />
  )

export default ProtectedRoutes
