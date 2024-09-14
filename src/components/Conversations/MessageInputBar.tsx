import { useState, ChangeEvent, useEffect } from 'react'
import LocalStorageService from '../../services/LocalStorageService'
import UserDetails from '../../models/UserDetails'
import { MemberHashToChat } from '../../models/MemberHashToChat'
import ChatService from '../../services/requesters/ChatService'
import { UserIdToUserDetails } from '../../models/UserIdToUserDetails'
import { generateMemberHash } from '../../models/MemberHash'

type MessageInputBarProps = {
  readonly draftThreadUserDetails: null | UserDetails
  readonly setDraftThreadUserDetails: (arg: null | UserDetails) => void
  readonly activeMemberHash: number | null
  readonly setActiveMemberHash: (arg: number) => void
  readonly memberHashToChat: MemberHashToChat
  readonly setMemberHashToChat: (arg: MemberHashToChat) => void
  readonly userIdToUserDetails: UserIdToUserDetails
  readonly setUserIdToUserDetails: (arg: UserIdToUserDetails) => void
  readonly showUserHeads: boolean
  readonly setShowUserHeads: (arg: boolean) => void
}

export default function MessageInputBar({
  draftThreadUserDetails,
  setDraftThreadUserDetails,
  activeMemberHash,
  setActiveMemberHash,
  memberHashToChat,
  setMemberHashToChat,
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
      if (messageValue && (draftThreadUserDetails || activeMemberHash)) {
        const { userId } = LocalStorageService.getUserDetails()

        const members = draftThreadUserDetails
          ? [userId, draftThreadUserDetails.userId]
          : memberHashToChat.get(activeMemberHash!)!.members

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

          const draftMemberHash = generateMemberHash(data.members)

          const updatedUserIdToUserDetails = new Map(userIdToUserDetails)
          updatedUserIdToUserDetails.set(draftThreadUserDetails.userId, {
            username: draftThreadUserDetails.username,
            avatar: draftThreadUserDetails.avatar
          })
          setUserIdToUserDetails(updatedUserIdToUserDetails)

          const memberHashToChatCopy = new Map(memberHashToChat)
          memberHashToChatCopy.set(draftMemberHash, generatedChat)
          setMemberHashToChat(memberHashToChatCopy)

          setActiveMemberHash(draftMemberHash)
          setDraftThreadUserDetails(null)
          setShowUserHeads(false)
        } else if (activeMemberHash) {
          const memberHashToChatCopy = new Map(memberHashToChat)
          const allMessages =
            memberHashToChatCopy.get(activeMemberHash)!.messages
          allMessages.push(data.message)
          setMemberHashToChat(memberHashToChatCopy)
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
