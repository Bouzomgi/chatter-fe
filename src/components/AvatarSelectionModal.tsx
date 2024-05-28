import '../styles/Modal.scss'
import '../styles/Arrow.scss'

import { IoIosClose } from 'react-icons/io'

// This will be removed when this is resolved via BE
import avatar1 from '../assets/avatars/avatar1.svg'
import avatar2 from '../assets/avatars/avatar2.svg'
import avatar3 from '../assets/avatars/avatar3.svg'
import avatar4 from '../assets/avatars/avatar4.svg'
import avatar5 from '../assets/avatars/avatar5.svg'
import avatar6 from '../assets/avatars/avatar6.svg'
import avatar7 from '../assets/avatars/avatar7.svg'
import avatar8 from '../assets/avatars/avatar8.svg'
import avatar9 from '../assets/avatars/avatar9.svg'

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9
]

type AvatarSelectionModalProps = {
  readonly clearModal: () => void
}

export default function AvatarSelectionModal({
  clearModal
}: AvatarSelectionModalProps) {
  const avatarImages = avatars.map((avatar, i) => (
    <img
      src={avatar}
      alt={`avatar ${i + 1}`}
      key={avatar}
      className='avatar'
      onClick={clearModal}
    />
  ))

  return (
    <div className='modal-centerer'>
      <div className='modal'>
        <div className='modal-top'>
          <IoIosClose className='exit-button' onClick={clearModal} />
        </div>
        <div className='modal-descriptor'>choose an avatar</div>
        <div className='avatar-grid'>{avatarImages}</div>
      </div>
    </div>
  )
}
