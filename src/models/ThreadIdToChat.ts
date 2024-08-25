import { Chat } from './Chat'

// threadId -> Chat
export type ThreadIdToChat = Map<number, Chat>

export function generateThreadIdToChat(chats: Chat[]): ThreadIdToChat {
  const chatMap: ThreadIdToChat = new Map()
  chats.forEach((chat) => chatMap.set(chat.threadId, chat))
  return chatMap
}
