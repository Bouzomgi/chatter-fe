import '../../styles/layout/Header.scss'

import LocalStorageService from '../../services/LocalStorageService'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthService from '../../services/requesters/AuthService'
import Notifier from './Notifier'

type HeaderProps = {
  readonly isLoggedIn: boolean
  readonly onSettingsPage?: boolean
}

function Header({ isLoggedIn, onSettingsPage }: HeaderProps) {
  const [isLogoutFailure, setIsLogoutFailure] = useState(false)

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
      <Link to='/settings' className={onSettingsPage ? 'active' : ''}>
        settings
      </Link>
      <button className={isLogoutFailure ? 'failure' : ''} onClick={logout}>
        log out
      </button>
    </div>
  )

  return (
    <div className='header'>
      <Notifier />
      <h1>chatter</h1>
      {isLoggedIn && options}
    </div>
  )
}

export default Header
