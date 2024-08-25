type MessageProps = {
  readonly messageId: number
  readonly content: string
  readonly isFromUser: boolean
  readonly addSpace?: boolean
}

export default function Message({
  messageId,
  content,
  isFromUser,
  addSpace = false
}: MessageProps) {
  const className =
    'message' +
    (addSpace ? ' add-top-gap' : '') +
    (isFromUser ? ' fromUser' : ' notFromUser')
  return (
    <li key={messageId} className={className}>
      {content}
    </li>
  )
}
