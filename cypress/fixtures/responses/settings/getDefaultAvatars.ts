import type { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type DefaultAvatarsResponse = ExtractResponseBody<
  '/authed/defaultAvatars',
  'get',
  HttpStatusCode.Ok
>

const mockDefaultAvatarsResponse: DefaultAvatarsResponse = [
  {
    name: './avatars/default/avatar1.svg',
    url: 'http://myserver/avatars/default/avatar1.svg'
  },
  {
    name: './avatars/default/avatar2.svg',
    url: 'http://myserver/avatars/default/avatar2.svg'
  },
  {
    name: './avatars/default/avatar3.svg',
    url: 'http://myserver/avatars/default/avatar3.svg'
  },
  {
    name: './avatars/default/avatar4.svg',
    url: 'http://myserver/avatars/default/avatar4.svg'
  },
  {
    name: './avatars/default/avatar5.svg',
    url: 'http://myserver/avatars/default/avatar5.svg'
  },
  {
    name: './avatars/default/avatar6.svg',
    url: 'http://myserver/avatars/default/avatar6.svg'
  },
  {
    name: './avatars/default/avatar7.svg',
    url: 'http://myserver/avatars/default/avatar7.svg'
  },
  {
    name: './avatars/default/avatar8.svg',
    url: 'http://myserver/avatars/default/avatar8.svg'
  },
  {
    name: './avatars/default/avatar9.svg',
    url: 'http://myserver/avatars/default/avatar9.svg'
  }
]

export default mockDefaultAvatarsResponse
