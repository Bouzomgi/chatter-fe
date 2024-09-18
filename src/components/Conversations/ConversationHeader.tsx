import { GoDot, GoDotFill } from 'react-icons/go'

export type ConversationHeaderProps = {
  readonly username: string
  readonly isActive: boolean
}

export function ConversationHeader({
  username,
  isActive
}: ConversationHeaderProps) {
  const activeDisplay = (
    <div className='activity-status'>
      <GoDotFill className='activity-dot isActive' />
      <span className='status-text'>Active now</span>
    </div>
  )
  const inactiveDisplay = (
    <div className='activity-status'>
      <GoDot className='activity-dot isInactive' />
      <span className='status-text'>Inactive</span>
    </div>
  )

  return (
    <div className='conversation-header'>
      <div className='username'>{username}</div>
      {isActive ? activeDisplay : inactiveDisplay}
    </div>
  )
}
