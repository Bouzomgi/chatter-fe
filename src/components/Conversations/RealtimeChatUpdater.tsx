import env from '../../config'
import useWebSocket from 'react-use-websocket'
import { useEffect } from 'react'
import MessageNotificationPayload from 'chatter-be/src/websockets/MessageNotificationPayload'
import { MemberHashToChat } from '../../models/MemberHashToChat'
import ChatService from '../../services/ChatService'
import {
  generateUserIdToUserDetails,
  UserIdToUserDetails
} from '../../models/UserIdToUserDetails'
import { generateMemberHash } from '../../models/MemberHash'

type RealtimeChatUpdaterProps = {
  readonly memberHashToChat: MemberHashToChat
  readonly setMemberHashToChat: (memberHashToChat: MemberHashToChat) => void
  readonly setUserIdToUserDetails: (
    UserIdToUserDetails: UserIdToUserDetails
  ) => void
}

export default function RealtimeChatUpdater({
  memberHashToChat,
  setMemberHashToChat,
  setUserIdToUserDetails
}: RealtimeChatUpdaterProps) {
  const { lastJsonMessage } = useWebSocket<MessageNotificationPayload>(
    env.REACT_APP_BACKEND_WEBSOCKET_ENDPOINT,
    {
      share: true,
      shouldReconnect: () => true
    }
  )

  useEffect(() => {
    if (lastJsonMessage) {
      const { conversationId, threadId, members, message } = lastJsonMessage

      const setData = async () => {
        const sentMessageHash = generateMemberHash(members)

        if (!memberHashToChat.has(sentMessageHash)) {
          const chatUserDetails = await ChatService.getChatUsersDetails()

          const generatedChatUserMap = generateUserIdToUserDetails(
            chatUserDetails.data
          )
          setUserIdToUserDetails(generatedChatUserMap)
        }

        const previousMessages =
          memberHashToChat.get(sentMessageHash)?.messages ?? []

        const chat = {
          conversationId: conversationId,
          threadId: threadId,
          unseenMessageId: message.messageId,
          members: members,
          messages: [...previousMessages, message]
        }

        const memberHashToChatCopy = new Map(memberHashToChat)
        memberHashToChatCopy.set(sentMessageHash, chat)
        setMemberHashToChat(memberHashToChatCopy)
      }

      setData()
    }
  }, [lastJsonMessage])

  return <span className='nodisplay' />
}
