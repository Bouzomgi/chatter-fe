import '../../styles/layout/Header.scss'

import LocalStorageService from '../../services/LocalStorageService'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AuthService from '../../services/requesters/AuthService'
import Notifier from './Notifier'

function Header() {
  const location = useLocation()

  const [isLogoutFailure, setIsLogoutFailure] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(
    LocalStorageService.areUserDetailsSet()
  )

  useEffect(() => {
    setIsLoggedIn(LocalStorageService.areUserDetailsSet())
  }, [location])

  const isOnSettingsPage = () => location.pathname.includes('settings')

  const navigate = useNavigate()

  async function logout() {
    try {
      await AuthService.logout()
      LocalStorageService.removeUserDetails()
      navigate('/')
    } catch {
      // shake the arrow
      setIsLogoutFailure(true)
      setTimeout(() => setIsLogoutFailure(false), 500)
    }
  }

  const options = (
    <div className='options'>
      <Link to='/settings' className={isOnSettingsPage() ? 'active' : ''}>
        settings
      </Link>
      <button className={isLogoutFailure ? 'failure' : ''} onClick={logout}>
        log out
      </button>
    </div>
  )

  return (
    <header className='header'>
      <h1>chatter</h1>
      {isLoggedIn && options}
      {isLoggedIn && <Notifier />}
    </header>
  )
}

export default Header
