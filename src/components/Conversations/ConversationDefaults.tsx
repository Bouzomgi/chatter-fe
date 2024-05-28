import { MessageHeadProps } from './MessageHead'
import { ConversationHeaderProps } from './ConversationHeader'
import { MessageComponents } from './Messages'
import { UserHeadProps } from './UserHead'

// This will be removed when this is resolved via BE
import avatar2 from '../../assets/avatars/avatar2.svg'
import avatar3 from '../../assets/avatars/avatar3.svg'
import avatar1 from '../../assets/avatars/avatar1.svg'
import avatar6 from '../../assets/avatars/avatar6.svg'
import avatar8 from '../../assets/avatars/avatar8.svg'
import avatar5 from '../../assets/avatars/avatar5.svg'

export const messageHeadsDefault: (MessageHeadProps & {
  conversationId: number
})[] = [
  {
    conversationId: 1,
    username: 'Marco',
    avatar: avatar2,
    message: 'Wow this is so cool',
    timestamp: new Date(),
    unseen: true
  },
  {
    conversationId: 2,
    username: 'James',
    avatar: avatar3,
    message:
      'hello, great to talk to ya! Blah blah blah blah blah! blah blah! Blah blah blah blah blah! blah blahBlah blah blah blah blah! blah blah blah blah blah blah! blah blah',
    timestamp: new Date(),
    unseen: false
  },
  {
    conversationId: 3,
    username: 'Natasha',
    avatar: avatar1,
    message: 'Greetings',
    timestamp: new Date(),
    unseen: true
  },
  {
    conversationId: 4,
    username: 'June',
    avatar: avatar5,
    message: 'hello this is text',
    timestamp: new Date(),
    unseen: true
  },
  {
    conversationId: 5,
    username: 'Marko',
    avatar: avatar8,
    message: 'yo',
    timestamp: new Date(),
    unseen: false
  },
  {
    conversationId: 6,
    username: 'Drew',
    avatar: avatar6,
    message:
      'to be passed into components for rendering dynamic content. This data could come from third-party APIs or be re',
    timestamp: new Date(),
    unseen: false
  }
]

export const conversationHeaderDefault: ConversationHeaderProps = {
  username: 'Marco',
  isActive: true
}

export const messagesDefault: MessageComponents[] = [
  {
    messageId: '1',
    senderUserId: '1',
    content: 'hello',
    timestamp: new Date('2024-02-11T02:30:00')
  },
  {
    messageId: '2',
    senderUserId: '2',
    content: 'hi!',
    timestamp: new Date('2024-02-11T08:35:00')
  },
  {
    messageId: '3',
    senderUserId: '2',
    content: 'great to talk to you!',
    timestamp: new Date('2024-02-11T08:35:02')
  },
  {
    messageId: '4',
    senderUserId: '2',
    content: 'goals!',
    timestamp: new Date('2024-02-11T08:35:59')
  },
  {
    messageId: '5',
    senderUserId: '1',
    content: 'yesssss',
    timestamp: new Date('2024-02-11T08:36:02')
  },
  {
    messageId: '6',
    senderUserId: '1',
    content: 'ok!!!!',
    timestamp: new Date('2024-02-11T11:32:02')
  },
  {
    messageId: '7',
    senderUserId: '2',
    content: 'I agree!',
    timestamp: new Date('2024-02-11T11:33:00')
  },
  {
    messageId: '8',
    senderUserId: '1',
    content: "Let's do it!",
    timestamp: new Date('2024-02-11T11:33:05')
  },
  {
    messageId: '9',
    senderUserId: '2',
    content: 'On it!',
    timestamp: new Date('2024-02-11T11:34:00')
  },
  {
    messageId: '10',
    senderUserId: '1',
    content: 'Almost there!',
    timestamp: new Date('2024-02-11T11:35:00')
  },
  {
    messageId: '11',
    senderUserId: '2',
    content: 'Keep going!',
    timestamp: new Date('2024-02-11T11:35:30')
  },
  {
    messageId: '12',
    senderUserId: '1',
    content: 'Just a few more!',
    timestamp: new Date('2024-02-11T11:36:00')
  },
  {
    messageId: '13',
    senderUserId: '2',
    content: 'Almost done!',
    timestamp: new Date('2024-02-11T11:36:30')
  },
  {
    messageId: '14',
    senderUserId: '1',
    content: 'Finished!',
    timestamp: new Date('2024-02-11T11:37:00')
  },
  {
    messageId: '15',
    senderUserId: '2',
    content: 'Great job!',
    timestamp: new Date('2024-02-11T11:37:30')
  }
]

export const userHeadDefaults: UserHeadProps[] = [
  {
    username: 'Marko',
    avatar: avatar8
  },
  {
    username: 'Drew',
    avatar: avatar6
  },
  {
    username: 'June',
    avatar: avatar5
  },
  {
    username: 'Marco',
    avatar: avatar2
  },
  {
    username: 'James',
    avatar: avatar3
  },
  {
    username: 'Natasha',
    avatar: avatar1
  }
]
