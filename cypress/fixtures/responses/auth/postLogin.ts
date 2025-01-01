import { ExtractPathRequestBody } from '@openapi/typeExtractors'
import { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type LoginRequest = ExtractPathRequestBody<'/api/login', 'post'>
type LoginResponse = ExtractResponseBody<
  '/api/login',
  'post',
  HttpStatusCode.Ok
>

const loginRequest: LoginRequest = {
  username: 'adam',
  password: 'a'
}

const mockLoginResponse: LoginResponse = {
  userId: 1,
  username: 'adam',
  avatar: {
    name: './avatars/default/avatar1.svg',
    url: './avatars/default/avatar1.svg'
  }
}

export default mockLoginResponse
