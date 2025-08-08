import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc)
dayjs.extend(timezone)

const DEFAULT_TZ = 'America/New_York'

const isTestEnv = import.meta.env.VITE_IS_TEST_ENV == 'true'

if (isTestEnv) {
  dayjs.tz.setDefault(DEFAULT_TZ)
}

function dayjsPatched(...args: any[]) {
  const day = dayjs(...args)

  return isTestEnv ? day.tz(DEFAULT_TZ) : day
}

export default dayjsPatched
