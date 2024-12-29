import { Navigate, Outlet } from 'react-router-dom'
import LocalStorageService from '../../services/LocalStorageService'
import StandardHandler from './authorizationHandlers/StandardHandler'

export const StandardRoutes = () =>
  LocalStorageService.areUserDetailsSet() ? (
    <Navigate to='/chatroom' replace={true} />
  ) : (
    <>
      <StandardHandler />
      <Outlet />
    </>
  )

export default StandardRoutes
