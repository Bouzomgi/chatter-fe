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

export type InitializeAction = {
  type: 'INITIALIZE'
  payload: {
    userIdToUserDetails: UserIdToUserDetails
    memberHashToChat: MemberHashToChat
  }
}

export type FieldKey = keyof ConversationState

export interface GenericUpdateFieldAction<T extends FieldKey> {
  type: 'UPDATE_FIELD'
  payload: {
    field: T
    value: ConversationState[T]
  }
}

export type UpdateFieldAction = GenericUpdateFieldAction<FieldKey>

export type UpdateActiveMemberHashAction = {
  type: 'UPDATE_ACTIVE_MEMBER_HASH'
  payload: {
    activeMemberHash: MemberHash
  }
}

export type SendMessageToNewConversationAction = {
  type: 'SEND_MESSAGE_TO_NEW_CONVERSATION'
  payload: {
    userIdToUserDetails: UserIdToUserDetails
    memberHashToChat: MemberHashToChat
    activeMemberHash: MemberHash
  }
}

export type PayloadlessAction = {
  type: 'WIPE_DRAFT_THREAD_USER_DETAILS' | 'TOGGLE_USER_HEADS'
}

export type Actions =
  | InitializeAction
  | UpdateFieldAction
  | UpdateActiveMemberHashAction
  | SendMessageToNewConversationAction
  | PayloadlessAction
