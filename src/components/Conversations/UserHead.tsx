import '../../styles/ChatHead.scss'
import arrow from '../../assets/arrow.svg'
import UserDetails from '../../models/UserDetails'

type UserHeadProps = {
  readonly draftThreadUserDetails: null | UserDetails
} & UserDetails

export function UserHead({
  userId,
  username,
  avatar,
  draftThreadUserDetails,
  onClick
}: UserHeadProps & {
  readonly onClick: () => void
}) {
  const isSelected = draftThreadUserDetails?.userId === userId

  return (
    <div className='head user-head'>
      <img className='avatar' src={avatar.url} alt={avatar.name} />
      <span className='username'>{username}</span>
      <span className='arrow-container'>
        <img
          className={'selection-arrow' + (isSelected ? ' selected' : '')}
          src={arrow}
          alt='next arrow'
          onClick={onClick}
        />
      </span>
    </div>
  )
}
