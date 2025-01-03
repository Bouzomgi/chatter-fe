import useWebSocket from 'react-use-websocket'
import { useEffect, Dispatch, useRef } from 'react'
import MessageNotificationPayload from 'chatter-be/src/websocket/MessageNotificationPayload'
import { MemberHashToChat } from '../../models/MemberHashToChat'
import ChatService from '../../services/requesters/ChatService'
import { generateUserIdToUserDetails } from '../../models/UserIdToUserDetails'
import { generateMemberHash } from '../../models/MemberHash'
import { Actions as ConversationActions } from '../reducers/conversation/Actions'
import { updateField } from '../reducers/conversation/ActionCreators'
import { useWebSocketConnection } from '../layout/socket/useWebSocketConnection'

type RealtimeChatUpdaterProps = {
  readonly memberHashToChat: MemberHashToChat
  readonly conversationDispatch: Dispatch<ConversationActions>
}

export default function RealtimeChatUpdater({
  memberHashToChat,
  conversationDispatch
}: RealtimeChatUpdaterProps) {
  const { lastJsonMessage } = useWebSocketConnection({
    url: `${process.env.REACT_APP_BACKEND_WEBSOCKET_ENDPOINT}/api/authed`
  })

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
          conversationDispatch(
            updateField('userIdToUserDetails', generatedChatUserMap)
          )
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

        conversationDispatch(
          updateField('memberHashToChat', memberHashToChatCopy)
        )
      }

      setData()
    }
  }, [lastJsonMessage])

  return <span className='nodisplay' />
}
