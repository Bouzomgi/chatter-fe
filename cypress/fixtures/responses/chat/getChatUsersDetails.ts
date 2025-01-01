import { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type ChatUsersDetailsResponse = ExtractResponseBody<
  '/api/authed/chatUsersDetails',
  'get',
  HttpStatusCode.Ok
>

const mockChatUsersDetailsResponse: ChatUsersDetailsResponse = [
  {
    userId: 2,
    username: 'britta',
    avatar: {
      name: './avatars/default/avatar2.svg',
      url: 'http://localhost:3000/avatars/default/avatar2.svg'
    }
  },
  {
    userId: 3,
    username: 'carl',
    avatar: {
      name: './avatars/default/avatar4.svg',
      url: 'http://localhost:3000/avatars/default/avatar4.svg'
    }
  },
  {
    userId: 4,
    username: 'dana',
    avatar: {
      name: './avatars/default/avatar1.svg',
      url: 'http://localhost:3000/avatars/default/avatar1.svg'
    }
  }
]

export default mockChatUsersDetailsResponse
