import { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios'
import { ExtractResponseBody } from './Extractors'
import { ExtractPathRequestBody } from 'chatter-be/openapi/typeExtractors'
import axiosAuthInstance from './AuthInterceptor'
import env from '../config'

type DefaultAvatarResponse = ExtractResponseBody<
  '/authed/defaultAvatars',
  'get',
  HttpStatusCode.Ok
>

type SettingsForm = {
  avatar: string
}

type SetSettingsRequest = ExtractPathRequestBody<'/authed/setSettings', 'post'>
type SetSettingsResponse = ExtractResponseBody<
  '/authed/setSettings',
  'post',
  HttpStatusCode.Ok
>

const axiosConfig: AxiosRequestConfig = {
  withCredentials: true
}

export default class SettingsService {
  static getDefaultAvatars() {
    return axiosAuthInstance.get<
      DefaultAvatarResponse,
      AxiosResponse<DefaultAvatarResponse>
    >(
      `${env.REACT_APP_BACKEND_HTTP_ENDPOINT}/authed/defaultAvatars`,
      axiosConfig
    )
  }

  static setSettings(settingsForm: SettingsForm) {
    return axiosAuthInstance.post<
      SetSettingsResponse,
      AxiosResponse<SetSettingsResponse>,
      SetSettingsRequest
    >(
      `${env.REACT_APP_BACKEND_HTTP_ENDPOINT}/authed/setSettings`,
      settingsForm,
      axiosConfig
    )
  }
}
