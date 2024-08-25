import { components } from 'chatter-be/openapi/schema'

type ChatUserDetails = components['schemas']['UserDetails']

// userId -> UserDetails
export type UserIdToUserDetails = Map<number, Omit<ChatUserDetails, 'userId'>>

export function generateUserIdToUserDetails(
  chatUserDetails: ChatUserDetails[]
): UserIdToUserDetails {
  const chatUserMap: UserIdToUserDetails = new Map()
  chatUserDetails.forEach((chatUserDetail) => {
    const { userId, ...trimmedChatUserDetail } = chatUserDetail
    chatUserMap.set(userId, trimmedChatUserDetail)
  })
  return chatUserMap
}
