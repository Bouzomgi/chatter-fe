import '../../styles/layout/Form.scss'
import '../../styles/pages/Settings.scss'

import Header from '../layout/Header'
import arrow from '../../assets/arrow.svg'
import EmptyFormRow from '../form/EmptyFormInputRow'
import { useState } from 'react'
import AvatarSelectionModal from '../modal/AvatarSelectionModal'
import LocalStorageService from '../../services/LocalStorageService'
import Avatar from '../../models/Avatar'
import SettingsService from '../../services/requesters/SettingsService'
import { useNavigate } from 'react-router-dom'

const getCurrentAvatar = () => {
  const { avatar } = LocalStorageService.getUserDetails()
  return {
    name: avatar.name,
    url: avatar.url
  }
}

export default function Settings() {
  const [isArrowShaking, setIsArrowShaking] = useState(false)

  const [showAvatarSelectionModal, setShowAvatarSelectionModal] =
    useState(false)

  const [currentSelectedAvatar, setCurrentSelectedAvatar] =
    useState<Avatar>(getCurrentAvatar())

  const navigate = useNavigate()

  const submitSettings = async () => {
    try {
      await SettingsService.setSettings({ avatar: currentSelectedAvatar.name })
      const userDetails = LocalStorageService.getUserDetails()
      LocalStorageService.setUserDetails({
        ...userDetails,
        avatar: currentSelectedAvatar
      })
      navigate('/chatroom')
    } catch {
      // shake the arrow
      setIsArrowShaking(true)
      setTimeout(() => setIsArrowShaking(false), 500)
    }
  }

  return (
    <div className='content'>
      {showAvatarSelectionModal && (
        <AvatarSelectionModal
          clearModal={() => setShowAvatarSelectionModal(false)}
          setCurrentSelectedAvatar={setCurrentSelectedAvatar}
        />
      )}

      <div className='form-centerer'>
        <div className='form'>
          <h1>settings</h1>
          <div className='form-row'>
            <span className='form-label' id='avatar-form-label'>
              current avatar
            </span>
            <img
              className='avatar'
              id='current-avatar'
              src={currentSelectedAvatar.url}
              alt='current avatar'
              onClick={() => setShowAvatarSelectionModal(true)}
            />
          </div>
          <EmptyFormRow />
          <EmptyFormRow />
          <div className='submission-row'>
            <button onClick={submitSettings}>
              <img
                className={'selection-arrow' + (isArrowShaking ? ' shake' : '')}
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
