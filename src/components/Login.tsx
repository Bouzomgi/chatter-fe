import '../styles/Form.scss'
import arrow from '../assets/arrow.svg'
import { Link } from 'react-router-dom'
import Header from './Header'
import EmptyFormRow from './EmptyFormRow'

export default function Login() {
  return (
    <div id='app'>
      <Header isLoggedIn={false} />
      <div className='content'>
        <div className='form'>
          <h1>login</h1>
          <span className='form-row'>
            <input type='text' placeholder='username' />
          </span>
          <span className='form-row'>
            <input type='text' placeholder='password' />
          </span>
          <EmptyFormRow />
          <div className='bottom'>
            <Link className='alternate-form-text' to='/register'>
              register?
            </Link>
            <img className='next-arrow' src={arrow} alt='next arrow' />
          </div>
        </div>
      </div>
    </div>
  )
}
