import type { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type LogoutResponse = ExtractResponseBody<'/logout', 'post', HttpStatusCode.Ok>

const mockLogoutResponse: LogoutResponse = {
  message: 'User was logged out'
}

export default mockLogoutResponse
