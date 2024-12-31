import { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type ReadThreadResponse = ExtractResponseBody<
  '/api/authed/readThread/{threadId}',
  'patch',
  HttpStatusCode.Ok
>

const readThread: ReadThreadResponse = {
  message: 'Thread marked as read'
}

export { readThread }
