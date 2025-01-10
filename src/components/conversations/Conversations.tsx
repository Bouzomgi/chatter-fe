import '../../styles/conversations/Conversations.scss'

import { UserHead } from './UserHead'
import { useEffect, useReducer } from 'react'
import ChatService from '../../services/requesters/ChatService'
import { generateUserIdToUserDetails } from '../../models/UserIdToUserDetails'
import { generateMemberSetToChat } from '../../models/MemberHashToChat'
import { ConversationBody } from './ConversationBody'
import MessageInputBar from './MessageInputBar'
import ChatHead from './ChatHead'
import LocalStorageService from '../../services/LocalStorageService'
import { generateMemberHash } from '../../models/MemberHash'
import { Chat } from '../../models/Chat'
import ConversationNav from './ConversationNav'

import conversationReducer from '../reducers/conversation/Reducer'
import { initialState as initialConversationState } from '../reducers/conversation/State'
import {
  initialize,
  updateField,
  wipeDraftThreadUserDetails,
  updateActiveMemberHash
} from '../reducers/conversation/ActionCreators'
import RealtimeChatUpdater from './RealtimeChatUpdater'

export default function Main() {
  const [state, dispatch] = useReducer(
    conversationReducer,
    initialConversationState
  )

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const chatUserDetails = await ChatService.getChatUsersDetails()
        const generatedChatUserMap = generateUserIdToUserDetails(
          chatUserDetails.data
        )

        const chats = await ChatService.getChats()
        const generatedChatMap = generateMemberSetToChat(chats.data)

        dispatch(initialize(generatedChatUserMap, generatedChatMap))
      } catch (err) {
        console.log(`fetch error: ${err}`)
        // Show some error message or go to error page
      }
    }

    fetchInitialData()

    const handleVisibilityChange = () =>
      dispatch(updateField('isTabActive', !document.hidden))

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    if (state.hasInitializedMaps && state.memberHashToChat.size > 0) {
      const sortedChats = getSortedChats()
      const updatedMemberHash = generateMemberHash(sortedChats[0].members)
      dispatch(updateField('activeMemberHash', updatedMemberHash))
    }
  }, [state.hasInitializedMaps])

  // view messages if they are the currently open thread
  useEffect(() => {
    if (state.isTabActive && state.activeMemberHash) {
      const activeChat = state.memberHashToChat.get(state.activeMemberHash)!
      cleanupUnseenMessage(activeChat)
    }

    getAreAnyUnseenMessages()
      ? (document.title = 'chatter!!!')
      : (document.title = 'chatter')
  }, [
    state.hasInitializedMaps,
    state.activeMemberHash,
    state.memberHashToChat,
    state.isTabActive
  ])

  useEffect(() => {
    if (state.showUserHeads) {
      const fetchUserHeads = async () => {
        const { data } = await ChatService.getUserHeads()
        dispatch(updateField('userHeads', data))
      }

      fetchUserHeads()
    } else {
      dispatch(wipeDraftThreadUserDetails())
    }
  }, [state.showUserHeads])

  const userId = LocalStorageService.getUserDetails().userId

  const getAreAnyUnseenMessages = () =>
    !Array.from(state.memberHashToChat.values()).every(
      (elem) =>
        elem.unseenMessageId === null || elem.unseenMessageId === undefined
    )

  const cleanupUnseenMessage = async (chat: Chat) => {
    if (chat.unseenMessageId) {
      await ChatService.patchReadThread(chat.threadId)

      const chatMemberHash = generateMemberHash(chat.members)
      const { unseenMessageId, ...rest } =
        state.memberHashToChat.get(chatMemberHash)!

      const memberHashToChatCopy = new Map(state.memberHashToChat)
      memberHashToChatCopy.set(chatMemberHash, { ...rest })

      dispatch(updateField('memberHashToChat', memberHashToChatCopy))
    }
  }

  const getSortedChats = () =>
    [...state.memberHashToChat.values()].sort((i, j) => {
      const firstMessageDate = new Date(i.messages.at(-1)!.createdAt)
      const secondMessageDate = new Date(j.messages.at(-1)!.createdAt)
      return firstMessageDate < secondMessageDate ? 1 : -1
    })

  const getActiveMemberSetUserDetails = () => {
    if (state.activeMemberHash) {
      const activeChat = state.memberHashToChat.get(state.activeMemberHash)!
      const otherMember = activeChat.members.filter(
        (elem) => elem !== userId
      )[0]
      return state.userIdToUserDetails.get(otherMember)
    }
    return undefined
  }

  // Components
  const allChatHeads = getSortedChats().map((chat) => {
    const mostRecentMessage = chat.messages.at(-1)!
    const otherMember = chat.members.filter((elem) => elem !== userId)[0]
    const chatUserDetails = state.userIdToUserDetails.get(otherMember)!
    const chatMemberHash = generateMemberHash(chat.members)

    const selectChatHead = async () => {
      try {
        // Read the thread and remove the unseenThread marker in the chatMap
        await cleanupUnseenMessage(chat)

        dispatch(updateField('activeMemberHash', chatMemberHash))
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
        isActive={chatMemberHash === state.activeMemberHash}
        key={chat.threadId}
      />
    )
  })

  const allUserHeads = state.userHeads.map((userHead) => (
    <UserHead
      {...userHead}
      draftThreadUserDetails={state.draftThreadUserDetails}
      onClick={() => {
        const memberHash = generateMemberHash([userId, userHead.userId])
        const existingThread = state.memberHashToChat.get(memberHash)

        if (existingThread) {
          dispatch(updateActiveMemberHash(memberHash))
        } else {
          dispatch(updateField('draftThreadUserDetails', userHead))
        }
      }}
      key={userHead.userId}
    />
  ))

  return (
    <div className='content conversations-view'>
      <RealtimeChatUpdater
        memberHashToChat={state.memberHashToChat}
        conversationDispatch={dispatch}
      />
      <ConversationNav
        showUserHeads={state.showUserHeads}
        allUserHeads={allUserHeads}
        allChatHeads={allChatHeads}
        dispatch={dispatch}
      />
      <div className='right-content'>
        <div className='conversation-body'>
          {state.draftThreadUserDetails ? (
            <ConversationBody
              username={state.draftThreadUserDetails.username}
              messages={[]}
            />
          ) : state.activeMemberHash ? (
            <ConversationBody
              username={getActiveMemberSetUserDetails()!.username}
              messages={
                state.memberHashToChat.get(state.activeMemberHash)!.messages
              }
            />
          ) : null}
        </div>
        <div className='message-input-container'>
          <MessageInputBar
            userIdToUserDetails={state.userIdToUserDetails}
            activeMemberHash={state.activeMemberHash}
            memberHashToChat={state.memberHashToChat}
            draftThreadUserDetails={state.draftThreadUserDetails}
            showUserHeads={state.showUserHeads}
            dispatch={dispatch}
          />
        </div>
      </div>
    </div>
  )
}
