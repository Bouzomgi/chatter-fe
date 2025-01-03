import '../../styles/conversations/ChatHead.scss'

import Avatar from '../../models/Avatar'
import { Chat as ChatType } from '../../models/Chat'
import MessageType from '../../models/Message'
import dayjs from 'dayjs'

const timestampToString = (timestamp: string): string => {
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

type ChatHeadProps = Omit<ChatType, 'messages'> & {
  readonly message: MessageType
} & {
  readonly avatar: Avatar
  readonly username: string
  readonly isActive: boolean
  readonly unseenMessageId?: number
  readonly onClick: () => void
}

export default function ChatHead({
  message,
  avatar,
  username,
  unseenMessageId,
  onClick,
  isActive
}: ChatHeadProps) {
  return (
    <div
      className={`head chat-head ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <img
        className={`avatar ${unseenMessageId ? ' unseen' : ''}`}
        src={avatar.url}
        alt={avatar.name}
      />
      <div className='head-content'>
        <div className='head-title'>
          <span className='username'>{username}</span>
          <span>{timestampToString(message.createdAt)}</span>
        </div>
        <span className='message-content'>{message.content}</span>
      </div>
    </div>
  )
}
