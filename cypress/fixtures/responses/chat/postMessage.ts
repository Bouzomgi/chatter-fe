import { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type MessageResponse = ExtractResponseBody<
  '/api/authed/message',
  'post',
  HttpStatusCode.Created
>

const mockMessageResponse: MessageResponse = {
  conversationId: 1,
  threadId: 1,
  members: [1, 2],
  message: {
    messageId: 12,
    fromUserId: 1,
    createdAt: 'Tue Dec 31 2024 01:34:50 GMT+0000 (Coordinated Universal Time)',
    content: 'Sent from Cypress!'
  }
}

const mockNewChatMessageResponse: MessageResponse = {
  conversationId: 5,
  threadId: 10,
  members: [1, 5],
  message: {
    messageId: 13,
    fromUserId: 5,
    createdAt: 'Tue Dec 31 2024 01:34:50 GMT+0000 (Coordinated Universal Time)',
    content: 'A new chat'
  }
}

export { mockMessageResponse, mockNewChatMessageResponse }
