import { UserIdToUserDetails } from '../../../models/UserIdToUserDetails'
import { MemberHashToChat } from '../../../models/MemberHashToChat'
import { MemberHash } from '../../../models/MemberHash'
import UserDetails from '../../../models/UserDetails'

import {
  InitializeAction,
  GenericUpdateFieldAction,
  UpdateActiveMemberHashAction,
  PayloadlessAction,
  FieldKey,
  ConversationState,
  SendMessageToNewConversationAction
} from './Actions'

export const initialize = (
  userIdToUserDetails: UserIdToUserDetails,
  memberHashToChat: MemberHashToChat
): InitializeAction => ({
  type: 'INITIALIZE',
  payload: { userIdToUserDetails, memberHashToChat }
})

export const updateField = <T extends FieldKey>(
  field: T,
  value: ConversationState[T]
): GenericUpdateFieldAction<T> => ({
  type: 'UPDATE_FIELD',
  payload: { field, value }
})

export const updateActiveMemberHash = (
  activeMemberHash: MemberHash
): UpdateActiveMemberHashAction => ({
  type: 'UPDATE_ACTIVE_MEMBER_HASH',
  payload: { activeMemberHash }
})

export const sendMessageToNewConversation = (
  userIdToUserDetails: UserIdToUserDetails,
  memberHashToChat: MemberHashToChat,
  activeMemberHash: MemberHash
): SendMessageToNewConversationAction => ({
  type: 'SEND_MESSAGE_TO_NEW_CONVERSATION',
  payload: {
    userIdToUserDetails,
    memberHashToChat,
    activeMemberHash
  }
})

export const wipeDraftThreadUserDetails = (): PayloadlessAction => ({
  type: 'WIPE_DRAFT_THREAD_USER_DETAILS'
})

export const toggleUserHeads = (): PayloadlessAction => ({
  type: 'TOGGLE_USER_HEADS'
})
