import axios, { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios'
import { ExtractPathRequestBody } from 'chatter-be/openapi/typeExtractors'
import { ExtractResponseBody } from '../Extractors'
import env from '../../config'

type LoginRequest = ExtractPathRequestBody<'/api/login', 'post'>
type LoginResponse = ExtractResponseBody<
  '/api/login',
  'post',
  HttpStatusCode.Ok
>

type RegisterRequest = ExtractPathRequestBody<'/api/register', 'post'>
type RegisterResponse = ExtractResponseBody<
  '/api/register',
  'post',
  HttpStatusCode.Created
>

type LogoutResponse = ExtractResponseBody<
  '/api/logout',
  'post',
  HttpStatusCode.Ok
>

const axiosConfig: AxiosRequestConfig = {
  withCredentials: true
}

export default class AuthService {
  static login(form: LoginRequest) {
    return axios.post<
      LoginResponse,
      AxiosResponse<LoginResponse>,
      LoginRequest
    >(`${env.REACT_APP_BACKEND_ENDPOINT}/api/login`, form, axiosConfig)
  }

  static register(form: RegisterRequest) {
    return axios.post<
      RegisterResponse,
      AxiosResponse<RegisterResponse>,
      RegisterRequest
    >(`${env.REACT_APP_BACKEND_ENDPOINT}/api/register`, form)
  }

  static logout() {
    return axios.post<LogoutResponse, AxiosResponse<LogoutResponse>>(
      `${env.REACT_APP_BACKEND_ENDPOINT}/api/logout`,
      {},
      axiosConfig
    )
  }
}
