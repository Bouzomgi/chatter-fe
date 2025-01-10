import { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type RegisterResponse = ExtractResponseBody<
  '/api/register',
  'post',
  HttpStatusCode.Created
>

const mockRegisterResponse: RegisterResponse = {
  message: 'Successfully created user'
}

export default mockRegisterResponse
