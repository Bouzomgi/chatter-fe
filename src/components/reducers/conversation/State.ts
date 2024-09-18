import { UserIdToUserDetails } from '../../../models/UserIdToUserDetails'
import { MemberHashToChat } from '../../../models/MemberHashToChat'
import { MemberHash } from '../../../models/MemberHash'
import UserDetails from '../../../models/UserDetails'

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
