import axios, { HttpStatusCode } from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ExtractPathRequestBody } from 'chatter-be/openapi/typeExtractors'
import type { ExtractResponseBody } from '../Extractors'

type LoginRequest = ExtractPathRequestBody<'/login', 'post'>
type LoginResponse = ExtractResponseBody<'/login', 'post', HttpStatusCode.Ok>

type RegisterRequest = ExtractPathRequestBody<'/register', 'post'>
type RegisterResponse = ExtractResponseBody<
  '/register',
  'post',
  HttpStatusCode.Created
>

type LogoutResponse = ExtractResponseBody<'/logout', 'post', HttpStatusCode.Ok>

const axiosConfig: AxiosRequestConfig = {
  withCredentials: true
}

export default class AuthService {
  static login(form: LoginRequest) {
    return axios.post<
      LoginResponse,
      AxiosResponse<LoginResponse>,
      LoginRequest
    >('/api/login', form, axiosConfig)
  }

  static register(form: RegisterRequest) {
    return axios.post<
      RegisterResponse,
      AxiosResponse<RegisterResponse>,
      RegisterRequest
    >('/api/register', form)
  }

  static logout() {
    return axios.post<LogoutResponse, AxiosResponse<LogoutResponse>>(
      '/api/logout',
      {},
      axiosConfig
    )
  }
}
