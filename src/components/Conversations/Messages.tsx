import '../../styles/Messages.scss'

import Message from './Message'
import TimestampLabel from './TimestampLabel'

import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export type MessageComponents = {
  readonly messageId: string
  readonly senderUserId: string
  readonly content: string
  readonly timestamp: Date
}

export type MessagesProps = {
  readonly messages: MessageComponents[]
}

export function Messages({ messages }: MessagesProps) {
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // const userId = localStorage.getItem('userId')
    // Will update
    const userId = '1'

    if (userId == null) {
      navigate('/')
    } else {
      setUserId(userId)
    }
  }, [navigate])

  const timestampList = messages.map((elem) => dayjs(elem.timestamp))
  const currentDay = dayjs()

  const headlessMessageList = messages.flatMap((message, index) => {
    const isFromUser = userId === message.senderUserId

    if (index < messages.length - 1) {
      const followingMessage = messages[index + 1]
      const currentMessageDate = timestampList[index]
      const followingMessageDate = timestampList[index + 1]

      const differenceInSeconds = Math.abs(
        followingMessageDate.diff(currentMessageDate, 'second')
      )

      const areDifferentDays = !currentMessageDate.isSame(
        followingMessageDate,
        'day'
      )

      const twoHoursInSeconds = 60 * 60 * 2

      // check for more than 2 hours apart
      if (differenceInSeconds >= twoHoursInSeconds || areDifferentDays) {
        return [
          <li key={message.messageId}>
            <Message content={message.content} isFromUser={isFromUser} />
          </li>,
          <li key={followingMessage + ' timestamp'}>
            <TimestampLabel
              messageDay={followingMessageDate}
              currentDay={currentDay}
            />
          </li>
        ]
      } else if (message.senderUserId === followingMessage.senderUserId) {
        if (differenceInSeconds >= 30) {
          return (
            <li key={message.messageId}>
              <Message
                content={message.content}
                isFromUser={isFromUser}
                addSpace={true}
              />
            </li>
          )
        }
      }
    }
    return (
      <li key={message.messageId}>
        <Message content={message.content} isFromUser={isFromUser} />
      </li>
    )
  })

  // Adds initial timestamp label
  const messageList =
    messages.length > 0
      ? [
          <li key={messages[0].messageId + ' timestamp'}>
            <TimestampLabel
              messageDay={timestampList[0]}
              currentDay={currentDay}
            />
          </li>,
          ...headlessMessageList
        ]
      : headlessMessageList

  return <ul className='message-list'>{messageList}</ul>
}
