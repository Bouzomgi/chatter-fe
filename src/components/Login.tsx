import '../styles/Form.scss'
import '../styles/Arrow.scss'

import arrow from '../assets/arrow.svg'
import { Link } from 'react-router-dom'
import Header from './Header'
import EmptyFormRow from './EmptyFormRow'

export default function Login() {
  return (
    <div id='app'>
      <Header isLoggedIn={false} />
      <div className='content form-centerer'>
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
            <Link to='/messages'>
              <img className='selection-arrow' src={arrow} alt='next arrow' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
