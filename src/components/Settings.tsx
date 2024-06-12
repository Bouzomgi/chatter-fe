import '../styles/Form.scss'
import '../styles/Settings.scss'

import Header from './Header'
import arrow from '../assets/arrow.svg'
import avatar2 from '../assets/avatars/avatar2.svg'
import EmptyFormRow from './EmptyFormRow'
import { useState } from 'react'
import AvatarSelectionModal from './AvatarSelectionModal'
import { Link } from 'react-router-dom'

export default function Settings() {
  const [showAvatarSelectionModal, setShowAvatarSelectionModal] =
    useState(false)

  return (
    <div id='app'>
      <Header isLoggedIn={true} onSettingsPage={true} />
      <div className='content'>
        {showAvatarSelectionModal && (
          <AvatarSelectionModal
            clearModal={() => setShowAvatarSelectionModal(false)}
          />
        )}

        <div className='form-centerer'>
          <div className='form'>
            <h1>settings</h1>
            <span className='form-row'>
              <div className='form-element' id='avatar-form-label'>
                current avatar
              </div>
              <img
                className='avatar'
                id='current-avatar'
                src={avatar2}
                alt='current avatar'
                onClick={() => setShowAvatarSelectionModal(true)}
              />
            </span>
            <EmptyFormRow />
            <EmptyFormRow />
            <div className='bottom'>
              <Link to='/chatroom'>
                <img className='selection-arrow' src={arrow} alt='next arrow' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
