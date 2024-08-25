import { useState, ChangeEvent, useEffect } from 'react'
import LocalStorageService from '../../services/LocalStorageService'
import UserDetails from '../../models/UserDetails'
import { ThreadIdToChat } from '../../models/ThreadIdToChat'
import ChatService from '../../services/ChatService'
import { UserIdToUserDetails } from '../../models/UserIdToUserDetails'

type MessageInputBarProps = {
  readonly draftThreadUserDetails: null | UserDetails
  readonly setDraftThreadUserDetails: (arg: null | UserDetails) => void
  readonly activeThread: number | null
  readonly setActiveThread: (arg: number) => void
  readonly threadIdToChat: ThreadIdToChat
  readonly setThreadIdToChat: (arg: ThreadIdToChat) => void
  readonly userIdToUserDetails: UserIdToUserDetails
  readonly setUserIdToUserDetails: (arg: UserIdToUserDetails) => void
  readonly showUserHeads: boolean
  readonly setShowUserHeads: (arg: boolean) => void
}

export default function MessageInputBar({
  draftThreadUserDetails,
  setDraftThreadUserDetails,
  activeThread,
  setActiveThread,
  threadIdToChat,
  setThreadIdToChat,
  userIdToUserDetails,
  setUserIdToUserDetails,
  showUserHeads,
  setShowUserHeads
}: MessageInputBarProps) {
  const [messageValue, setMessageValue] = useState('')

  useEffect(() => {
    setMessageValue('')
  }, [showUserHeads])

  const handleMessageValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageValue(event.target.value)
  }

  const handleMessageKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      submitMessage()
    }
  }

  const submitMessage = async () => {
    try {
      if (messageValue && (draftThreadUserDetails || activeThread)) {
        const { userId } = LocalStorageService.getUserDetails()

        const members = draftThreadUserDetails
          ? [userId, draftThreadUserDetails.userId]
          : threadIdToChat.get(activeThread!)!.members

        const { data } = await ChatService.postMessage({
          members,
          content: messageValue
        })

        if (draftThreadUserDetails) {
          const generatedChat = {
            conversationId: data.conversationId,
            threadId: data.threadId,
            members: data.members,
            messages: [data.message]
          }

          const updatedUserIdToUserDetails = new Map(userIdToUserDetails)
          updatedUserIdToUserDetails.set(draftThreadUserDetails.userId, {
            username: draftThreadUserDetails.username,
            avatar: draftThreadUserDetails.avatar
          })
          setUserIdToUserDetails(updatedUserIdToUserDetails)

          const updatedThreadIdToChat = new Map(threadIdToChat)
          updatedThreadIdToChat.set(data.threadId, generatedChat)
          setThreadIdToChat(updatedThreadIdToChat)

          setActiveThread(data.threadId)
          setDraftThreadUserDetails(null)
          setShowUserHeads(false)
        } else if (activeThread) {
          const updatedThreadIdToChat = new Map(threadIdToChat)
          const allMessages = updatedThreadIdToChat.get(activeThread)!.messages
          allMessages.push(data.message)
          setThreadIdToChat(updatedThreadIdToChat)
        }

        setMessageValue('')
      }
    } catch (err) {
      console.log(`Issue with submitting message: ${err}`)
    }
  }

  return (
    <input
      className='message-bar'
      value={messageValue}
      onChange={handleMessageValueChange}
      onKeyDown={handleMessageKeyDown}
    />
  )
}
