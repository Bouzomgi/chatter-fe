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
      name: './avatars/default/avatar4.svg',
      url: 'http://myserver/avatars/default/avatar4.svg'
    }
  },
  {
    userId: 2,
    username: 'britta',
    avatar: {
      name: './avatars/default/avatar2.svg',
      url: 'http://myserver/avatars/default/avatar2.svg'
    }
  },
  {
    userId: 3,
    username: 'carl',
    avatar: {
      name: './avatars/default/avatar4.svg',
      url: 'http://myserver/avatars/default/avatar4.svg'
    }
  },
  {
    userId: 4,
    username: 'dana',
    avatar: {
      name: './avatars/default/avatar1.svg',
      url: 'http://myserver/avatars/default/avatar1.svg'
    }
  },
  {
    userId: 5,
    username: 'edward',
    avatar: {
      name: './avatars/default/avatar5.svg',
      url: 'http://myserver/avatars/default/avatar5.svg'
    }
  },
  {
    userId: 7,
    username: 'zaid',
    avatar: {
      name: './avatars/default/avatar4.svg',
      url: 'http://myserver/avatars/default/avatar4.svg'
    }
  }
]

export default mockUserHeadsResponse
