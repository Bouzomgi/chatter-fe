import { ExtractPathRequestBody } from '@openapi/typeExtractors'
import { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type RegisterRequest = ExtractPathRequestBody<'/api/register', 'post'>
type RegisterResponse = ExtractResponseBody<
  '/api/register',
  'post',
  HttpStatusCode.Created
>

const registerRequest: RegisterRequest = {
  username: 'zaid',
  email: 'zaid@example.com',
  password: 'testPassword'
}

const mockRegisterResponse: RegisterResponse = {
  message: 'Successfully created user'
}

export default mockRegisterResponse
