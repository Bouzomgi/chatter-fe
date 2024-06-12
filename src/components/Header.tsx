import '../styles/Header.scss'
import { Link } from 'react-router-dom'

type HeaderProps = {
  readonly isLoggedIn: boolean
  readonly onSettingsPage?: boolean
}

function Header({ isLoggedIn, onSettingsPage }: HeaderProps) {
  const options = (
    <div className='options'>
      <Link to='/settings' className={onSettingsPage ? 'active' : ''}>
        settings
      </Link>
      <Link to='/'>log out</Link>
    </div>
  )

  return (
    <div className='header'>
      <h1>chatter</h1>
      {isLoggedIn && options}
    </div>
  )
}

export default Header
