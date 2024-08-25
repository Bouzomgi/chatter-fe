import { paths } from 'chatter-be/openapi/schema'

type PathMethods = keyof paths
type PathMethodResponse<
  Path extends PathMethods,
  Method extends keyof paths[Path]
> = paths[Path][Method] extends { responses: infer R } ? R : never

export type ExtractResponseBody<
  Path extends PathMethods,
  Method extends keyof paths[Path],
  StatusCode extends keyof PathMethodResponse<Path, Method>
> = PathMethodResponse<Path, Method>[StatusCode] extends {
  content: infer Content
}
  ? Content extends { 'application/json': infer Json }
    ? Json
    : never
  : never
