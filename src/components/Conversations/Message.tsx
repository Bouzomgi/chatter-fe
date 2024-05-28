import { timeStamp } from 'console'

type MessageProps = {
  readonly content: string
  readonly isFromUser: boolean
  readonly addSpace?: boolean
}

export default function Message({
  content,
  isFromUser,
  addSpace = false
}: MessageProps) {
  const className =
    'message' +
    (addSpace ? ' next-delayed' : '') +
    (isFromUser ? ' fromUser' : ' notFromUser')
  return <div className={className}>{content}</div>
}
