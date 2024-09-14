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
  MemberHashToChat,
  generateMemberSetToChat
} from '../../models/MemberHashToChat'
import UserDetails from '../../models/UserDetails'
import { ConversationBody } from './ConversationBody'
import MessageInputBar from './MessageInputBar'
import ChatHead from './ChatHead'
import LocalStorageService from '../../services/LocalStorageService'
import RealtimeChatUpdater from './RealtimeChatUpdater'
import { MemberHash, generateMemberHash } from '../../models/MemberHash'
import { Chat } from '../../models/Chat'

export default function Main() {
  // activeMemberHash is a set of members of the active thread
  const [activeMemberHash, setActiveMemberHash] = useState<null | MemberHash>(
    null
  )
  const [showUserHeads, setShowUserHeads] = useState(false)

  const [userHeads, setUserHeads] = useState<UserDetails[]>([])

  const [userIdToUserDetails, setUserIdToUserDetails] =
    useState<UserIdToUserDetails>(new Map())

  const [memberHashToChat, setMemberHashToChat] = useState<MemberHashToChat>(
    new Map()
  )
  const [hasInitializedMaps, setHasInitializedMaps] = useState(false)

  const [draftThreadUserDetails, setDraftThreadUserDetails] =
    useState<null | UserDetails>(null)

  const [isTabActive, setIsTabActive] = useState(true)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const chatUserDetails = await ChatService.getChatUsersDetails()
        const generatedChatUserMap = generateUserIdToUserDetails(
          chatUserDetails.data
        )
        setUserIdToUserDetails(generatedChatUserMap)

        const chats = await ChatService.getChats()
        const generatedChatMap = generateMemberSetToChat(chats.data)
        setMemberHashToChat(generatedChatMap)

        setHasInitializedMaps(true)
      } catch (err) {
        console.log(`fetch error: ${err}`)
        // Show some error message or go to error page
      }
    }

    fetchInitialData()

    const handleVisibilityChange = () => setIsTabActive(!document.hidden)

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    if (hasInitializedMaps && memberHashToChat.size > 0) {
      const sortedChats = getSortedChats()
      setActiveMemberHash(generateMemberHash(sortedChats[0].members))
    }
  }, [hasInitializedMaps])

  // view messages if they are the currently open thread
  useEffect(() => {
    if (isTabActive && activeMemberHash) {
      const activeChat = memberHashToChat.get(activeMemberHash)!
      cleanupUnseenMessage(activeChat)
    }

    getAreAnyUnseenMessages()
      ? (document.title = 'chatter!!!')
      : (document.title = 'chatter')
  }, [hasInitializedMaps, activeMemberHash, memberHashToChat, isTabActive])

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

  const getAreAnyUnseenMessages = () =>
    !Array.from(memberHashToChat.values()).every(
      (elem) =>
        elem.unseenMessageId === null || elem.unseenMessageId === undefined
    )

  const cleanupUnseenMessage = async (chat: Chat) => {
    if (chat.unseenMessageId) {
      await ChatService.patchReadThread(chat.threadId)

      const chatMemberHash = generateMemberHash(chat.members)
      const { unseenMessageId, ...rest } = memberHashToChat.get(chatMemberHash)!

      const memberHashToChatCopy = new Map(memberHashToChat)
      memberHashToChatCopy.set(chatMemberHash, { ...rest })
      setMemberHashToChat(memberHashToChatCopy)
    }
  }

  const getSortedChats = () =>
    [...memberHashToChat.values()].sort((i, j) => {
      const firstMessageDate = new Date(i.messages.at(-1)!.createdAt)
      const secondMessageDate = new Date(j.messages.at(-1)!.createdAt)
      return firstMessageDate < secondMessageDate ? 1 : -1
    })

  const getActiveMemberSetUserDetails = () => {
    if (activeMemberHash) {
      const activeChat = memberHashToChat.get(activeMemberHash)!
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
    const chatMemberHash = generateMemberHash(chat.members)

    const selectChatHead = async () => {
      try {
        // Read the thread and remove the unseenThread marker in the chatMap
        await cleanupUnseenMessage(chat)
        setActiveMemberHash(chatMemberHash)
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
        isActive={chatMemberHash === activeMemberHash}
        key={chat.threadId}
      />
    )
  })

  const allUserHeads = userHeads.map((userHead) => (
    <UserHead
      {...userHead}
      draftThreadUserDetails={draftThreadUserDetails}
      onClick={() => {
        const memberHash = generateMemberHash([userId, userHead.userId])
        const existingThread = memberHashToChat.get(memberHash)

        if (existingThread) {
          setActiveMemberHash(memberHash)
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
      <RealtimeChatUpdater
        memberHashToChat={memberHashToChat}
        setMemberHashToChat={setMemberHashToChat}
        setUserIdToUserDetails={setUserIdToUserDetails}
      />
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
            ) : activeMemberHash ? (
              <ConversationBody
                username={getActiveMemberSetUserDetails()!.username}
                messages={memberHashToChat.get(activeMemberHash)!.messages}
              />
            ) : null}
          </div>
          <div className='message-bar-container'>
            <MessageInputBar
              draftThreadUserDetails={draftThreadUserDetails}
              setDraftThreadUserDetails={setDraftThreadUserDetails}
              activeMemberHash={activeMemberHash}
              setActiveMemberHash={setActiveMemberHash}
              memberHashToChat={memberHashToChat}
              setMemberHashToChat={setMemberHashToChat}
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
