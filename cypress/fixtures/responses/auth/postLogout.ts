import { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type LogoutResponse = ExtractResponseBody<
  '/api/logout',
  'post',
  HttpStatusCode.Ok
>

const logoutResponse: LogoutResponse = {
  message: 'User was logged out'
}

export { logoutResponse }
