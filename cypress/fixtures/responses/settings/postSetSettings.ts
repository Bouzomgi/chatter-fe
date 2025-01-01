import { ExtractPathRequestBody } from '@openapi/typeExtractors'
import { ExtractResponseBody } from '@src/services/Extractors'
import { HttpStatusCode } from 'axios'

type SetSettingsRequest = ExtractPathRequestBody<
  '/api/authed/setSettings',
  'post'
>
type SetSettingsResponse = ExtractResponseBody<
  '/api/authed/setSettings',
  'post',
  HttpStatusCode.Ok
>

const setSettingsRequest: SetSettingsRequest = {
  avatar: './avatars/default/avatar9.svg'
}

const mockSetSettingsResponse: SetSettingsResponse = {
  message: 'Successfully changed settings'
}

export default mockSetSettingsResponse
