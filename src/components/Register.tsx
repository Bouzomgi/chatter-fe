import '../styles/Form.scss'
import { Link } from 'react-router-dom'
import arrow from '../assets/arrow.svg'
import Header from './Header'

export default function Register() {
  return (
    <div id='app'>
      <Header isLoggedIn={false} />
      <div className='content'>
        <div className='form'>
          <h1>sign up</h1>
          <span className='form-row'>
            <input type='text' placeholder='email' />
          </span>
          <span className='form-row'>
            <input type='text' placeholder='username' />
          </span>
          <span className='form-row'>
            <input type='text' placeholder='password' />
          </span>
          <div className='bottom'>
            <Link className='alternate-form-text' to='/'>
              login?
            </Link>
            <img className='next-arrow' src={arrow} alt='next arrow' />
          </div>
        </div>
      </div>
    </div>
  )
}
