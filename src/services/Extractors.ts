import { HttpStatusCode } from 'axios'
import { paths } from 'chatter-be/openapi/schema'

type SuccessfulResponses =
  | HttpStatusCode.Ok
  | HttpStatusCode.Created
  | HttpStatusCode.Accepted

type ExtractJsonContent<T> = T extends {
  content: { 'application/json': infer U }
}
  ? U
  : never

export type ExtractSuccessfulJsonResponses<
  R extends keyof paths,
  M extends keyof paths[R]
> = paths[R][M] extends { responses: Record<string, unknown> }
  ? {
      [K in keyof paths[R][M]['responses']]: K extends SuccessfulResponses
        ? ExtractJsonContent<paths[R][M]['responses'][K]>
        : never
    }[keyof paths[R][M]['responses']]
  : never

type ErroneousResponses =
  | HttpStatusCode.BadRequest
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.NotFound

export type ExtractErroneousJsonResponses<
  R extends keyof paths,
  M extends keyof paths[R]
> = paths[R][M] extends { responses: Record<string, unknown> }
  ? {
      [K in keyof paths[R][M]['responses']]: K extends ErroneousResponses
        ? ExtractJsonContent<paths[R][M]['responses'][K]>
        : never
    }[keyof paths[R][M]['responses']]
  : never
