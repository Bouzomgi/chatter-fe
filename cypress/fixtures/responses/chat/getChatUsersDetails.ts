import type { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type ChatUsersDetailsResponse = ExtractResponseBody<
  '/authed/chatUsersDetails',
  'get',
  HttpStatusCode.Ok
>

const mockChatUsersDetailsResponse: ChatUsersDetailsResponse = [
  {
    userId: 2,
    username: 'britta',
    avatar: {
      name: './avatar2.svg',
      url: './avatar2.svg'
    }
  },
  {
    userId: 3,
    username: 'carl',
    avatar: {
      name: './avatar4.svg',
      url: './avatar4.svg'
    }
  },
  {
    userId: 4,
    username: 'dana',
    avatar: {
      name: './avatar1.svg',
      url: './avatar1.svg'
    }
  }
]

// usersDetailsResponse with foreign user added
const modifiedGetUsersDetailsResponse: ChatUsersDetailsResponse = [
  ...mockChatUsersDetailsResponse,
  {
    userId: 5,
    username: 'edward',
    avatar: {
      name: './avatar7.svg',
      url: './avatar7.svg'
    }
  }
]

export { mockChatUsersDetailsResponse, modifiedGetUsersDetailsResponse }
