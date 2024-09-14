import { cleanEnv, str } from 'envalid'

const env = cleanEnv(process.env, {
  REACT_APP_BACKEND_HTTP_ENDPOINT: str(),
  REACT_APP_BACKEND_WEBSOCKET_ENDPOINT: str()
})

export default env
