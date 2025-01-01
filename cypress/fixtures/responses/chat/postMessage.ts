import { ExtractPathRequestBody } from '@openapi/typeExtractors'
import { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type MessageRequest = ExtractPathRequestBody<'/api/authed/message', 'post'>
type MessageResponse = ExtractResponseBody<
  '/api/authed/message',
  'post',
  HttpStatusCode.Created
>

const messageRequest: MessageRequest = {
  members: [1, 2],
  content: 'Send from Cypress!'
}

const mockMessageResponse: MessageResponse = {
  conversationId: 1,
  threadId: 1,
  members: [1, 2],
  message: {
    messageId: 12,
    fromUserId: 1,
    createdAt: 'Tue Dec 31 2024 01:34:50 GMT+0000 (Coordinated Universal Time)',
    content: 'Send from Cypress!'
  }
}

export default mockMessageResponse
