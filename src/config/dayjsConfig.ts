import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

const isTestEnv = (import.meta.env.VITE_IS_TEST_ENV ?? 'false') === 'true'

dayjs.extend(utc)

if (isTestEnv) {
  dayjs.extend(timezone)
}
