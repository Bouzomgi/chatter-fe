import axios, { AxiosResponse } from 'axios'
import { ExtractSuccessfulJsonResponses } from './Extractors'
import { ExtractPathRequestBody } from 'chatter-be/openapi/typeExtractors'

type LoginRequest = ExtractPathRequestBody<'/login', 'post'>
type LoginResponse = ExtractSuccessfulJsonResponses<'/login', 'post'>

type loginForm = {
  username: string
  password: string
}
type RegisterRequest = ExtractPathRequestBody<'/register', 'post'>
type RegisterResponse = ExtractSuccessfulJsonResponses<'/register', 'post'>

type registerForm = {
  username: string
  email: string
  password: string
}

export default class AuthService {
  static login(form: loginForm) {
    return axios.post<
      LoginResponse,
      AxiosResponse<LoginResponse>,
      LoginRequest
    >(`${process.env.REACT_APP_BACKEND_ENDPOINT}/login`, form)
  }

  static register(form: registerForm) {
    return axios.post<
      RegisterResponse,
      AxiosResponse<RegisterResponse>,
      RegisterRequest
    >(`${process.env.REACT_APP_BACKEND_ENDPOINT}/register`, form)
  }
}
