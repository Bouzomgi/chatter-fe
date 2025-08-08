import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

if (import.meta.env.VITE_IS_TEST_ENV) {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  dayjs.tz.setDefault('EST')
}
