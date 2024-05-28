import '../../styles/Conversations.scss'

import Header from '../Header'
import { MessageHead } from './MessageHead'
import { ConversationHeader } from './ConversationHeader'
import { Messages } from './Messages'
import { UserHead } from './UserHead'
import { useRef, useEffect, useState } from 'react'

import {
  messageHeadsDefault,
  conversationHeaderDefault,
  messagesDefault,
  userHeadDefaults
} from './ConversationDefaults'

export default function Main() {
  const [activeConversation, setActiveConversation] = useState(
    messageHeadsDefault[0].conversationId // Will adjust
  )

  const [showUserHeads, setShowUserHeads] = useState(false)

  const scrollableDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight
    }
  }, [])

  const userHeads = userHeadDefaults.map((userHeadData) => (
    <UserHead
      {...userHeadData}
      onClick={() => setShowUserHeads(false)}
      key={userHeadData.username}
    />
  ))

  const messageHeads = messageHeadsDefault.map((message) => (
    <MessageHead
      {...message}
      onClick={() => setActiveConversation(message.conversationId)}
      isActive={message.conversationId === activeConversation}
      key={message.username}
    />
  ))

  return (
    <div id='app'>
      <Header isLoggedIn={true} />
      <div className='content conversations-view'>
        <div className='conversation-nav'>
          <div className='search-container form-element'>
            <input type='text' placeholder='search' />
          </div>
          <div className='message-head-container'>
            {showUserHeads ? userHeads : messageHeads}
          </div>
          <div className='new-conversation-container'>
            <button
              className={'new-chat ' + (showUserHeads ? 'active' : '')}
              onClick={() => setShowUserHeads(!showUserHeads)}
            >
              chat!
            </button>
          </div>
        </div>
        <div className='conversation-body'>
          {ConversationHeader(conversationHeaderDefault)}
          <div className='messages' ref={scrollableDivRef}>
            <Messages messages={messagesDefault} />
          </div>
          <div className='message-bar-container'>
            <input className='message-bar' />
          </div>
        </div>
      </div>
    </div>
  )
}
