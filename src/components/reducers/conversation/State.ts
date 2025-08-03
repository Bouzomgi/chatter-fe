import type { UserIdToUserDetails } from '../../../models/UserIdToUserDetails'
import type { MemberHashToChat } from '../../../models/MemberHashToChat'
import type { MemberHash } from '../../../models/MemberHash'
import type { UserDetails } from '../../../models/UserDetails'

export type ConversationState = {
  activeMemberHash: null | MemberHash
  userHeads: UserDetails[]
  userIdToUserDetails: UserIdToUserDetails
  memberHashToChat: MemberHashToChat
  draftThreadUserDetails: null | UserDetails
  isTabActive: boolean
  hasInitializedMaps: boolean
  showUserHeads: boolean
}

export const initialState: ConversationState = {
  activeMemberHash: null,
  userHeads: [],
  userIdToUserDetails: new Map(),
  memberHashToChat: new Map(),
  draftThreadUserDetails: null,
  isTabActive: true,
  hasInitializedMaps: false,
  showUserHeads: false
}
