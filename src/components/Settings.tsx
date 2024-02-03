import '../styles/Form.scss'
import '../styles/Settings.scss'
import Header from './Header'
import arrow from '../assets/arrow.svg'
import avatar2 from '../assets/avatar-2.svg'
import EmptyFormRow from './EmptyFormRow'

export default function Settings() {
  return (
    <div id='app'>
      <Header isLoggedIn={false} />
      <div className='content'>
        <div className='form'>
          <h1>settings</h1>
          <span className='form-row'>
            <div className='form-element' id='avatar-form-label'>
              current avatar
            </div>
            <img id='current-avatar' src={avatar2} alt='current avatar' />
          </span>
          <EmptyFormRow />
          <EmptyFormRow />
          <div className='bottom'>
            <img className='next-arrow' src={arrow} alt='next arrow' />
          </div>
        </div>
      </div>
    </div>
  )
}
