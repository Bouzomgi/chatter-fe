import { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios'
import { ExtractResponseBody } from '../Extractors'
import { ExtractPathRequestBody } from 'chatter-be/openapi/typeExtractors'
import axiosAuthInstance from '../AuthInterceptor'
import env from '../../config'

type ChatUsersDetailsResponse = ExtractResponseBody<
  '/api/authed/chatUsersDetails',
  'get',
  HttpStatusCode.Ok
>

type ChatsResponse = ExtractResponseBody<
  '/api/authed/chats',
  'get',
  HttpStatusCode.Ok
>

type UserHeadsResponse = ExtractResponseBody<
  '/api/authed/userHeads',
  'get',
  HttpStatusCode.Ok
>

type ReadThreadResponse = ExtractResponseBody<
  '/api/authed/readThread/{threadId}',
  'patch',
  HttpStatusCode.Ok
>

type MessageRequest = ExtractPathRequestBody<'/api/authed/message', 'post'>
type MessageResponse = ExtractResponseBody<
  '/api/authed/message',
  'post',
  HttpStatusCode.Created
>

const axiosConfig: AxiosRequestConfig = {
  withCredentials: true
}

export default class ChatService {
  static getChatUsersDetails() {
    return axiosAuthInstance.get<
      ChatUsersDetailsResponse,
      AxiosResponse<ChatUsersDetailsResponse>
    >(
      `${env.REACT_APP_BACKEND_ENDPOINT}/api/authed/chatUsersDetails`,
      axiosConfig
    )
  }

  static getChats() {
    return axiosAuthInstance.get<ChatsResponse, AxiosResponse<ChatsResponse>>(
      `${env.REACT_APP_BACKEND_ENDPOINT}/api/authed/chats`,
      axiosConfig
    )
  }

  static getUserHeads() {
    return axiosAuthInstance.get<
      UserHeadsResponse,
      AxiosResponse<UserHeadsResponse>
    >(`${env.REACT_APP_BACKEND_ENDPOINT}/api/authed/userHeads`, axiosConfig)
  }

  static patchReadThread(threadId: number) {
    return axiosAuthInstance.patch<
      ReadThreadResponse,
      AxiosResponse<ReadThreadResponse>
    >(
      `${env.REACT_APP_BACKEND_ENDPOINT}/api/authed/readThread/${threadId}`,
      {},
      axiosConfig
    )
  }

  static postMessage(form: MessageRequest) {
    return axiosAuthInstance.post<
      MessageResponse,
      AxiosResponse<MessageResponse>,
      MessageRequest
    >(`${env.REACT_APP_BACKEND_ENDPOINT}/api/authed/message`, form, axiosConfig)
  }
}
