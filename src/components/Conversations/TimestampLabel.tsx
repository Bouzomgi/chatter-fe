import dayjs from 'dayjs'

type TimestampLabelProps = {
  readonly messageDay: dayjs.Dayjs
  readonly currentDay: dayjs.Dayjs
}

export default function TimestampLabel({
  messageDay,
  currentDay
}: TimestampLabelProps) {
  const daysDifference = currentDay.diff(messageDay, 'day')
  const dayDisplay =
    daysDifference >= 7
      ? messageDay.format('ddd, MMM [at] h:mm A')
      : messageDay.format('dddd h:mm A')

  return <div className='timestamp-label'>{dayDisplay}</div>
}
