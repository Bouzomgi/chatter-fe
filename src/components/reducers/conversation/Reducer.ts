import type { UpdateFieldAction, ConversationState, Actions } from './Actions'

import { initialState } from './State'

const isUpdateFieldAction = (action: any): action is UpdateFieldAction =>
  action.type === 'UPDATE_FIELD' &&
  action.payload &&
  typeof action.payload.field === 'string' &&
  action.payload.field in initialState

const conversationReducer = (
  state: ConversationState,
  action: Actions
): ConversationState => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, ...action.payload, hasInitializedMaps: true }
    case 'UPDATE_FIELD': {
      if (isUpdateFieldAction(action)) {
        return {
          ...state,
          [action.payload.field]: action.payload.value
        }
      }
      return state // Fallback in case of invalid action
    }
    case 'UPDATE_ACTIVE_MEMBER_HASH':
      return {
        ...state,
        activeMemberHash: action.payload.activeMemberHash,
        showUserHeads: false
      }
    case 'TOGGLE_USER_HEADS':
      return {
        ...state,
        showUserHeads: !state.showUserHeads,
        draftThreadUserDetails: null
      }
    case 'SEND_MESSAGE_TO_NEW_CONVERSATION':
      return {
        ...state,
        ...action.payload,
        draftThreadUserDetails: null,
        showUserHeads: false
      }
    case 'WIPE_DRAFT_THREAD_USER_DETAILS':
      return { ...state, draftThreadUserDetails: null }
    default:
      return state
  }
}

export default conversationReducer
