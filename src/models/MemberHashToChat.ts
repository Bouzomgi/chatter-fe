import type { Chat } from './Chat'
import type { MemberHash } from './MemberHash'
import { generateMemberHash } from './MemberHash'

// memberHash -> Chat
export type MemberHashToChat = Map<MemberHash, Chat>

export function generateMemberSetToChat(chats: Chat[]): MemberHashToChat {
  const chatMap: MemberHashToChat = new Map()
  chats.forEach((chat) => chatMap.set(generateMemberHash(chat.members), chat))
  return chatMap
}
