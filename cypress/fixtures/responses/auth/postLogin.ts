import type { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type LoginResponse = ExtractResponseBody<'/login', 'post', HttpStatusCode.Ok>

const mockLoginResponse: LoginResponse = {
  userId: 1,
  username: 'adam',
  avatar: {
    name: './avatars/default/avatar1.svg',
    url: 'http://myserver/avatars/default/avatar1.svg'
  }
}

export default mockLoginResponse
