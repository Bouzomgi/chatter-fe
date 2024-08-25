import '../styles/Modal.scss'
import '../styles/Arrow.scss'
import { useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import SettingsService from '../services/SettingsService'
import Avatar from '../models/Avatar'

type AvatarSelectionModalProps = {
  readonly clearModal: () => void
  readonly setCurrentSelectedAvatar: (avatar: Avatar) => void
}

export default function AvatarSelectionModal({
  clearModal,
  setCurrentSelectedAvatar
}: AvatarSelectionModalProps) {
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [error, setError] = useState('')

  async function setDefaultAvatars() {
    try {
      const avatars = await SettingsService.getDefaultAvatars()
      setAvatars(avatars.data.defaultAvatars)
    } catch (err) {
      console.log(err)
      setError('Could not get default avatars')
    }
  }

  useEffect(() => {
    setDefaultAvatars()
  }, [])

  const selectAvatar = (name: string, url: string) => {
    setCurrentSelectedAvatar({ name, url })
    clearModal()
  }

  const avatarImages = avatars.map((avatar, i) => (
    <img
      src={avatar.url}
      alt={avatar.name}
      key={avatar.name}
      className='avatar'
      onClick={() => selectAvatar(avatar.name, avatar.url)}
    />
  ))

  const content = error ? (
    error
  ) : (
    <div className='avatar-grid'>{avatarImages}</div>
  )

  return (
    <div className='modal-centerer'>
      <div className='modal'>
        <div className='modal-top'>
          <IoIosClose className='exit-button' onClick={clearModal} />
        </div>
        <div className='modal-descriptor'>choose an avatar</div>
        {content}
      </div>
    </div>
  )
}
