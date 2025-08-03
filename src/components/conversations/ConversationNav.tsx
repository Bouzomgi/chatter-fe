import type { Dispatch, JSX } from 'react'
import type { PayloadlessAction } from '../reducers/conversation/Actions'
import { toggleUserHeads } from '../reducers/conversation/ActionCreators'

type ConversationNavProps = {
  readonly showUserHeads: boolean
  readonly allUserHeads: JSX.Element[]
  readonly allChatHeads: JSX.Element[]
  readonly dispatch: Dispatch<PayloadlessAction>
}

export default function ConversationNav({
  showUserHeads,
  allUserHeads,
  allChatHeads,
  dispatch
}: ConversationNavProps) {
  return (
    <div className='conversation-nav'>
      <div className='search-container form-element'>
        {/* <input type='text' placeholder='search' /> */}
      </div>
      <div className='chat-head-container'>
        {showUserHeads ? allUserHeads : allChatHeads}
      </div>
      <div className='new-conversation-container'>
        <button
          data-cy='new-chat'
          className={'new-chat ' + (showUserHeads ? 'active' : '')}
          onClick={() => dispatch(toggleUserHeads())}
        >
          chat!
        </button>
      </div>
    </div>
  )
}
