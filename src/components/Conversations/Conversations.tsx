import '../../styles/Conversations.scss'

import Header from '../Header'
import { UserHead } from './UserHead'
import { useEffect, useState } from 'react'
import ChatService from '../../services/ChatService'
import {
  UserIdToUserDetails,
  generateUserIdToUserDetails
} from '../../models/UserIdToUserDetails'
import {
  ThreadIdToChat,
  generateThreadIdToChat
} from '../../models/ThreadIdToChat'
import UserDetails from '../../models/UserDetails'
import { ConversationBody } from './ConversationBody'
import MessageInputBar from './MessageInputBar'
import ChatHead from './ChatHead'
import LocalStorageService from '../../services/LocalStorageService'

export default function Main() {
  const [activeThread, setActiveThread] = useState<null | number>(null)
  const [showUserHeads, setShowUserHeads] = useState(false)

  const [userHeads, setUserHeads] = useState<UserDetails[]>([])

  const [userIdToUserDetails, setUserIdToUserDetails] =
    useState<UserIdToUserDetails>(new Map())

  const [threadIdToChat, setThreadIdToChat] = useState<ThreadIdToChat>(
    new Map()
  )
  const [hasInitializedMaps, setHasInitializedMaps] = useState(false)

  const [draftThreadUserDetails, setDraftThreadUserDetails] =
    useState<null | UserDetails>(null)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const chatUserDetails = await ChatService.getChatUsersDetails()
        const generatedChatUserMap = generateUserIdToUserDetails(
          chatUserDetails.data
        )
        setUserIdToUserDetails(generatedChatUserMap)

        const chats = await ChatService.getChats()
        const generatedChatMap = generateThreadIdToChat(chats.data)
        setThreadIdToChat(generatedChatMap)

        setHasInitializedMaps(true)
      } catch (err) {
        console.log(`fetch error: ${err}`)
        // Show some error message or go to error page
      }
    }

    fetchInitialData()
  }, [])

  useEffect(() => {
    if (hasInitializedMaps && threadIdToChat.size > 0) {
      const sortedChats = getSortedChats()
      setActiveThread(sortedChats[0].threadId)
    }
  }, [hasInitializedMaps])

  useEffect(() => {
    if (showUserHeads) {
      const fetchUserHeads = async () => {
        const { data } = await ChatService.getUserHeads()
        setUserHeads(data)
      }

      fetchUserHeads()
    } else {
      setDraftThreadUserDetails(null)
    }
  }, [showUserHeads])

  const userId = LocalStorageService.getUserDetails().userId

  const getMembersToThread = () =>
    new Map(
      Array.from(threadIdToChat).map(([threadId, chat]) => [
        new Set(chat.members),
        threadId
      ])
    )

  const getSortedChats = () =>
    [...threadIdToChat.values()].sort((i, j) => {
      const firstMessageDate = new Date(i.messages.at(-1)!.createdAt)
      const secondMessageDate = new Date(j.messages.at(-1)!.createdAt)
      return firstMessageDate < secondMessageDate ? 1 : -1
    })

  const getActiveThreadUserDetails = () => {
    if (activeThread) {
      const activeChat = threadIdToChat.get(activeThread)!
      const otherMember = activeChat.members.filter(
        (elem) => elem !== userId
      )[0]
      return userIdToUserDetails.get(otherMember)
    }
    return undefined
  }

  // Components
  const allChatHeads = getSortedChats().map((chat) => {
    const mostRecentMessage = chat.messages.at(-1)!
    const otherMember = chat.members.filter((elem) => elem !== userId)[0]
    const chatUserDetails = userIdToUserDetails.get(otherMember)!

    const selectChatHead = async () => {
      try {
        // Read the thread and remove the unseenThread marker in the chatMap
        if (chat.unseenMessageId) {
          await ChatService.patchReadThread(chat.threadId)
          const { unseenMessageId, ...rest } = threadIdToChat.get(
            chat.threadId
          )!
          threadIdToChat.set(chat.threadId, { ...rest })
          setThreadIdToChat(threadIdToChat)
        }
        setActiveThread(chat.threadId)
      } catch (err) {
        console.log(err)
      }
    }

    return (
      <ChatHead
        {...chatUserDetails}
        {...chat}
        message={mostRecentMessage}
        onClick={selectChatHead}
        isActive={chat.threadId === activeThread}
        key={chat.threadId}
      />
    )
  })

  const allUserHeads = userHeads.map((userHead) => (
    <UserHead
      {...userHead}
      draftThreadUserDetails={draftThreadUserDetails}
      onClick={() => {
        const membersSet = new Set([userId, userHead.userId])
        const existingThread = getMembersToThread().get(membersSet)

        if (existingThread) {
          setActiveThread(existingThread)
          setShowUserHeads(false)
        } else {
          setDraftThreadUserDetails(userHead)
        }
      }}
      key={userHead.userId}
    />
  ))

  return (
    <div id='app'>
      <Header isLoggedIn={true} />
      <div className='content conversations-view'>
        <div className='conversation-nav'>
          <div className='search-container form-element'>
            {/* <input type='text' placeholder='search' /> */}
          </div>
          <div className='message-head-container'>
            {showUserHeads ? allUserHeads : allChatHeads}
          </div>
          <div className='new-conversation-container'>
            <button
              className={'new-chat ' + (showUserHeads ? 'active' : '')}
              onClick={() => {
                setDraftThreadUserDetails(null)
                setShowUserHeads(!showUserHeads)
              }}
            >
              chat!
            </button>
          </div>
        </div>
        <div className='right-content'>
          <div className='conversation-body'>
            {draftThreadUserDetails ? (
              <ConversationBody
                username={draftThreadUserDetails.username}
                messages={[]}
              />
            ) : activeThread ? (
              <ConversationBody
                username={getActiveThreadUserDetails()!.username}
                messages={threadIdToChat.get(activeThread)!.messages}
              />
            ) : null}
          </div>
          <div className='message-bar-container'>
            <MessageInputBar
              draftThreadUserDetails={draftThreadUserDetails}
              setDraftThreadUserDetails={setDraftThreadUserDetails}
              activeThread={activeThread}
              setActiveThread={setActiveThread}
              threadIdToChat={threadIdToChat}
              setThreadIdToChat={setThreadIdToChat}
              userIdToUserDetails={userIdToUserDetails}
              setUserIdToUserDetails={setUserIdToUserDetails}
              showUserHeads={showUserHeads}
              setShowUserHeads={setShowUserHeads}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
