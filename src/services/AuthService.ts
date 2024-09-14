import axios, { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios'
import { ExtractPathRequestBody } from 'chatter-be/openapi/typeExtractors'
import { ExtractResponseBody } from './Extractors'
import env from '../config'

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
    >(`${env.REACT_APP_BACKEND_HTTP_ENDPOINT}/login`, form, axiosConfig)
  }

  static register(form: RegisterRequest) {
    return axios.post<
      RegisterResponse,
      AxiosResponse<RegisterResponse>,
      RegisterRequest
    >(`${env.REACT_APP_BACKEND_HTTP_ENDPOINT}/register`, form)
  }

  static logout() {
    return axios.post<LogoutResponse, AxiosResponse<LogoutResponse>>(
      `${env.REACT_APP_BACKEND_HTTP_ENDPOINT}/logout`,
      {},
      axiosConfig
    )
  }
}
