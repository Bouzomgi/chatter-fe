import axios, { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios'
import { ExtractPathRequestBody } from 'chatter-be/openapi/typeExtractors'
import { ExtractResponseBody } from './Extractors'

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
    >(`${process.env.REACT_APP_BACKEND_ENDPOINT}/login`, form, axiosConfig)
  }

  static register(form: RegisterRequest) {
    return axios.post<
      RegisterResponse,
      AxiosResponse<RegisterResponse>,
      RegisterRequest
    >(`${process.env.REACT_APP_BACKEND_ENDPOINT}/register`, form)
  }

  static logout() {
    return axios.post<LogoutResponse, AxiosResponse<LogoutResponse>>(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/logout`,
      {},
      axiosConfig
    )
  }
}
