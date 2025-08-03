import type { Message as MessageType } from '../../models/Message'
import { ConversationHeader } from './ConversationHeader'
import { Messages } from './Messages'

export type ConversationHeaderProps = {
  readonly username: string
  readonly messages: MessageType[]
}

export function ConversationBody({
  username,
  messages
}: ConversationHeaderProps) {
  return (
    <>
      <ConversationHeader username={username} isActive={false} />
      <Messages messages={messages} />
    </>
  )
}
