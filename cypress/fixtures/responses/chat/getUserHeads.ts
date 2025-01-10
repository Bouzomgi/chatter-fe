import { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type UserHeadsResponse = ExtractResponseBody<
  '/api/authed/userHeads',
  'get',
  HttpStatusCode.Ok
>

const mockUserHeadsResponse: UserHeadsResponse = [
  {
    userId: 6,
    username: 'brian',
    avatar: {
      name: './avatar4.svg',
      url: './avatar4.svg'
    }
  },
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
  },
  {
    userId: 5,
    username: 'edward',
    avatar: {
      name: './avatar5.svg',
      url: './avatar5.svg'
    }
  }
]

export default mockUserHeadsResponse
