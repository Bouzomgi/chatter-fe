import type { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type SetSettingsResponse = ExtractResponseBody<
  '/authed/setSettings',
  'post',
  HttpStatusCode.Ok
>

const mockSetSettingsResponse: SetSettingsResponse = {
  message: 'Successfully changed settings'
}

export default mockSetSettingsResponse
