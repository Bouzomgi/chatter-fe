import '../../styles/MessageHead.scss'

import dayjs from 'dayjs'

export type MessageHeadProps = {
  readonly username: string
  readonly avatar: string
  readonly message: string
  readonly timestamp: Date
  readonly unseen: boolean
}

const timestampToString = (timestamp: Date): string => {
  const messageDay = dayjs(timestamp)
  const currentDay = dayjs()
  if (messageDay.isSame(currentDay, 'date')) {
    return messageDay.format('h:mm a')
  } else if (messageDay.isSame(currentDay, 'week')) {
    return messageDay.format('dddd')
  } else {
    return messageDay.format('M/D/YY')
  }
}

export function MessageHead({
  username,
  avatar,
  message,
  timestamp,
  unseen,
  isActive,
  onClick
}: MessageHeadProps & {
  readonly isActive: boolean
  readonly onClick: () => void
}) {
  const avatarImageAlt = `${username} avatar`
  return (
    <div
      className={`head message-head ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <img
        className={`avatar ${unseen ? ' unseen' : ''}`}
        src={avatar}
        alt={avatarImageAlt}
      />
      <div className='head-content'>
        <div className='head-title'>
          <span className='username'>{username}</span>
          <span>{timestampToString(timestamp)}</span>
        </div>
        <span className='message-content'>{message}</span>
      </div>
    </div>
  )
}
