import '../../styles/MessageHead.scss'
import arrow from '../../assets/arrow.svg'

export type UserHeadProps = {
  readonly username: string
  readonly avatar: string
}

export function UserHead({
  username,
  avatar,
  onClick
}: UserHeadProps & {
  readonly onClick: () => void
}) {
  const avatarImageAlt = `${username} avatar`
  return (
    <div className='head user-head'>
      <img className='avatar' src={avatar} alt={avatarImageAlt} />
      <span className='username'>{username}</span>
      <span className='arrow-container'>
        <img
          className='selection-arrow'
          src={arrow}
          alt='next arrow'
          onClick={onClick}
        />
      </span>
    </div>
  )
}
