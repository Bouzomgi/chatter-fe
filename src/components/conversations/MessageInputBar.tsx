import { useState, ChangeEvent, useEffect, Dispatch } from 'react'
import LocalStorageService from '../../services/LocalStorageService'
import ChatService from '../../services/requesters/ChatService'
import { generateMemberHash, MemberHash } from '../../models/MemberHash'
import {
  SendMessageToNewConversationAction,
  UpdateFieldAction
} from '../reducers/conversation/Actions'
import {
  sendMessageToNewConversation,
  updateField
} from '../reducers/conversation/ActionCreators'
import { MemberHashToChat } from '../../models/MemberHashToChat'
import UserDetails from '../../models/UserDetails'
import { UserIdToUserDetails } from '../../models/UserIdToUserDetails'

type MessageInputBarProps = {
  readonly userIdToUserDetails: UserIdToUserDetails
  readonly activeMemberHash: null | MemberHash
  readonly memberHashToChat: MemberHashToChat
  readonly draftThreadUserDetails: null | UserDetails
  readonly showUserHeads: boolean
  readonly dispatch: Dispatch<
    SendMessageToNewConversationAction | UpdateFieldAction
  >
}

export default function MessageInputBar({
  userIdToUserDetails,
  activeMemberHash,
  memberHashToChat,
  draftThreadUserDetails,
  showUserHeads,
  dispatch
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

          const memberHashToChatCopy = new Map(memberHashToChat)
          memberHashToChatCopy.set(draftMemberHash, generatedChat)

          dispatch(
            sendMessageToNewConversation(
              updatedUserIdToUserDetails,
              memberHashToChatCopy,
              draftMemberHash
            )
          )
        } else if (activeMemberHash) {
          const memberHashToChatCopy = new Map(memberHashToChat)
          const allMessages =
            memberHashToChatCopy.get(activeMemberHash)!.messages
          allMessages.push(data.message)
          dispatch(updateField('memberHashToChat', memberHashToChatCopy))
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
