import '../../styles/conversations/Message.scss'

import Message from './Message'
import type { Message as MessageType } from '../../models/Message'
import LocalStorageService from '../../services/LocalStorageService'
import dayjs from '@src/utils/dayjsWrapper'
import TimestampLabel from './TimestampLabel'
import { useRef, useEffect } from 'react'

export type MessagesProps = {
  readonly messages: MessageType[]
}

const twoHoursInSeconds = 60 * 60 * 2
const thirtySeconds = 30

export function Messages({ messages }: MessagesProps) {
  const { userId } = LocalStorageService.getUserDetails()
  const timestampList = messages.flatMap((elem) => dayjs(elem.createdAt))
  const currentDay = dayjs()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // messages is an array, so we use this approach to see when messages has changed
  const messagesLength = messages.length

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
  }, [messagesLength]) // re-run when messages change

  const messageList = messages.map((message, index) => {
    const isFromUser = `${userId}` === `${message.fromUserId}`
    const currentMessageDate = timestampList[index]

    const messageWithTimestamp = [
      <TimestampLabel
        key={message.messageId + ' timestamp'}
        labelingMessageId={message.messageId}
        messageDay={currentMessageDate}
        currentDay={currentDay}
      />,
      <Message
        key={message.messageId}
        messageId={message.messageId}
        content={message.content}
        isFromUser={isFromUser}
      />
    ]

    if (index === 0) {
      return messageWithTimestamp
    }

    const previousMessageDate = timestampList[index - 1]

    const differenceInSeconds = Math.abs(
      currentMessageDate.diff(previousMessageDate, 'second')
    )

    const areDifferentDays = !currentMessageDate.isSame(
      previousMessageDate,
      'day'
    )

    const shouldShowTimestamp =
      differenceInSeconds >= twoHoursInSeconds || areDifferentDays

    const isPreviousMessageFromDifferentChatter =
      message.fromUserId !== messages[index - 1].fromUserId

    if (shouldShowTimestamp) {
      return messageWithTimestamp
    }

    const shouldAddSpace =
      isPreviousMessageFromDifferentChatter ||
      differenceInSeconds >= thirtySeconds

    return [
      <Message
        key={message.messageId}
        messageId={message.messageId}
        content={message.content}
        isFromUser={isFromUser}
        addSpace={shouldAddSpace}
      />
    ]
  })

  return (
    <div className='messages' ref={messagesEndRef}>
      <ul className='message-list'>{messageList}</ul>
    </div>
  )
}
