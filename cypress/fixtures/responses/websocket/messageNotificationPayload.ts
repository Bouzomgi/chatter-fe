import MessageNotificationPayload from 'chatter-be/src/websocket/MessageNotificationPayload'

const localMessageNotificationResponse: MessageNotificationPayload = {
  conversationId: 1,
  threadId: 1,
  members: [1, 2],
  message: {
    messageId: 100,
    fromUserId: 2,
    createdAt: '2024-09-15T10:01:00.000Z',
    content: 'this is a foreign message'
  }
}

const foreignMessageNotificationResponse: MessageNotificationPayload = {
  conversationId: 100,
  threadId: 100,
  members: [1, 5],
  message: {
    messageId: 100,
    fromUserId: 5,
    createdAt: '2024-09-15T10:01:00.000Z',
    content: 'this is a new chat foreign message'
  }
}

export { localMessageNotificationResponse, foreignMessageNotificationResponse }
