import type { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type ReadThreadResponse = ExtractResponseBody<
  '/authed/readThread/{threadId}',
  'patch',
  HttpStatusCode.Ok
>

const mockReadThreadResponse: ReadThreadResponse = {
  message: 'Thread marked as read'
}

export default mockReadThreadResponse
