import { AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios'
import { ExtractResponseBody } from '../Extractors'
import { ExtractPathRequestBody } from 'chatter-be/openapi/typeExtractors'
import axiosAuthInstance from '../AuthInterceptor'
import env from '../../config'

type ChatUsersDetailsResponse = ExtractResponseBody<
  '/authed/chatUsersDetails',
  'get',
  HttpStatusCode.Ok
>

type ChatsResponse = ExtractResponseBody<
  '/authed/chats',
  'get',
  HttpStatusCode.Ok
>

type UserHeadsResponse = ExtractResponseBody<
  '/authed/userHeads',
  'get',
  HttpStatusCode.Ok
>

type ReadThreadResponse = ExtractResponseBody<
  '/authed/readThread/{threadId}',
  'patch',
  HttpStatusCode.Ok
>

type MessageRequest = ExtractPathRequestBody<'/authed/message', 'post'>
type MessageResponse = ExtractResponseBody<
  '/authed/message',
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
      `${env.REACT_APP_BACKEND_HTTP_ENDPOINT}/authed/chatUsersDetails`,
      axiosConfig
    )
  }

  static getChats() {
    return axiosAuthInstance.get<ChatsResponse, AxiosResponse<ChatsResponse>>(
      `${env.REACT_APP_BACKEND_HTTP_ENDPOINT}/authed/chats`,
      axiosConfig
    )
  }

  static getUserHeads() {
    return axiosAuthInstance.get<
      UserHeadsResponse,
      AxiosResponse<UserHeadsResponse>
    >(`${env.REACT_APP_BACKEND_HTTP_ENDPOINT}/authed/userHeads`, axiosConfig)
  }

  static patchReadThread(threadId: number) {
    return axiosAuthInstance.patch<
      ReadThreadResponse,
      AxiosResponse<ReadThreadResponse>
    >(
      `${env.REACT_APP_BACKEND_HTTP_ENDPOINT}/authed/readThread/${threadId}`,
      {},
      axiosConfig
    )
  }

  static postMessage(form: MessageRequest) {
    return axiosAuthInstance.post<
      MessageResponse,
      AxiosResponse<MessageResponse>,
      MessageRequest
    >(
      `${env.REACT_APP_BACKEND_HTTP_ENDPOINT}/authed/message`,
      form,
      axiosConfig
    )
  }
}
