import type { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type RegisterResponse = ExtractResponseBody<
  '/register',
  'post',
  HttpStatusCode.Created
>

const mockRegisterResponse: RegisterResponse = {
  message: 'Successfully created user'
}

export default mockRegisterResponse
