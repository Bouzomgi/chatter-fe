import '../styles/Form.scss'
import '../styles/Arrow.scss'

import arrow from '../assets/arrow.svg'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import EmptyFormRow from './EmptyFormRow'
import { useState } from 'react'
import AuthService from '../services/AuthService'

export default function Login() {
  const [isShaking, setIsShaking] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })

  const navigate = useNavigate()

  function assignInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target
    setLoginForm((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  async function submitLogin() {
    try {
      await AuthService.login(loginForm)
      navigate('/chatroom')
    } catch (error) {
      // shake the arrow
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      console.log(error)
    }
  }

  return (
    <div id='app'>
      <Header isLoggedIn={false} />
      <div className='content form-centerer'>
        <div className='form'>
          <h1>login</h1>
          <span className='form-row'>
            <input
              type='text'
              id='username'
              placeholder='username'
              value={loginForm.username}
              onChange={assignInput}
            />
          </span>
          <span className='form-row'>
            <input
              type='text'
              id='password'
              placeholder='password'
              value={loginForm.password}
              onChange={assignInput}
            />
          </span>
          <EmptyFormRow />
          <div className='bottom'>
            <Link className='alternate-form-text' to='/register'>
              register?
            </Link>
            <button onClick={submitLogin}>
              <img
                className={'selection-arrow' + (isShaking ? ' shake' : '')}
                src={arrow}
                alt='next arrow'
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
