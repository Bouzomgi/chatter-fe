import dayjs from '@src/utils/dayjsWrapper'

type TimestampLabelProps = {
  readonly labelingMessageId: number
  readonly messageDay: dayjs.Dayjs
  readonly currentDay: dayjs.Dayjs
}

export default function TimestampLabel({
  labelingMessageId,
  messageDay,
  currentDay
}: TimestampLabelProps) {
  const daysDifference = currentDay.diff(messageDay, 'day')
  const dayDisplay =
    daysDifference >= 7
      ? messageDay.format('ddd, MMM D [at] h:mm A')
      : messageDay.format('dddd h:mm A')

  return (
    <li key={labelingMessageId + ' timestamp'} className='timestamp-label'>
      {dayDisplay}
    </li>
  )
}
