import dayjs, { ManipulateType } from 'dayjs'
// NOTE: Vercel デフォルトでTimezoneがUTCにならないようにする
// https://zenn.dev/kohki_s/articles/a77ac4badf0f3c
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(timezone)

export const DAY_OF_WEEK = {
  SUNDAY: '0',
  MONDAY: '1',
  TUESDAY: '2',
  WEDNESDAY: '3',
  THURSDAY: '4',
  FRIDAY: '5',
  SATURDAY: '6',
}

const japaneseWeek = (date: string) => {
  const week = formatDayOfWeek(date)
  switch (week) {
    case DAY_OF_WEEK.SUNDAY:
      return '(日)'
    case DAY_OF_WEEK.MONDAY:
      return '(月)'
    case DAY_OF_WEEK.TUESDAY:
      return '(火)'
    case DAY_OF_WEEK.WEDNESDAY:
      return '(水)'
    case DAY_OF_WEEK.THURSDAY:
      return '(木)'
    case DAY_OF_WEEK.FRIDAY:
      return '(金)'
    case DAY_OF_WEEK.SATURDAY:
      return '(土)'
    default:
      return ''
  }
}

/**
 * 今日の日時を取得し、文字列に変換する
 */
export const currentTimeDate = dayjs().tz('Asia/Tokyo').toString()

/**
 * 指定した日付をYYYY-MM-DDに変換する
 */
export const formatData = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    return dayjs(data).tz('Asia/Tokyo').format('YYYY/MM/DD')
  }
  return ''
}

/**
 * 指定した日付をYYYY-MM-DD (曜日)に変換する
 */
export const formatDataWithDayOfWeek = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    const value = dayjs(data).tz('Asia/Tokyo').format('YYYY/MM/DD')
    return value + japaneseWeek(value)
  }
  return ''
}

/**
 * 指定した日程からをYYYYに変換する
 */
export const formatYear = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    return dayjs(data).tz('Asia/Tokyo').format('YYYY')
  }
  return ''
}

/**
 * 指定した日付をMM-DD (曜日)に変換する
 */
export const formatMonthDayWithDayOfWeek = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    const value = dayjs(data).tz('Asia/Tokyo').format('MM/DD')
    return value + japaneseWeek(value)
  }
  return ''
}

/**
 * 指定した日付をYYYY-MM-DD HH:mmに変換する
 */
export const formatDataWithTime = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    return dayjs(data).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm')
  }
  return ''
}

/**
 * 指定した日時からHH:mmに変換する
 */
export const formatTime = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    return dayjs(data).tz('Asia/Tokyo').format('HH:mm')
  }
  return ''
}

/**
 * 現在日時からHHを取得する
 */
export const currentHour = dayjs().tz('Asia/Tokyo').format('HH')

/**
 * 指定した日時からmmに変換する
 */
export const currentMinutes = dayjs().tz('Asia/Tokyo').format('mm')

/**
 * 指定した日時から1日後の日時を取得し、文字列に変換する
 */
export const addDay = (date: string, type: ManipulateType = 'day'): string => {
  if (dayjs(date).isValid()) {
    return dayjs(date).tz('Asia/Tokyo').add(1, type).toString()
  }
  return ''
}

/**
 * 指定した日時から1日前の日時を取得、文字列に変換する
 */
export const subtractDay = (date: string, type: ManipulateType = 'day'): string => {
  if (dayjs(date).isValid()) {
    return dayjs(date).tz('Asia/Tokyo').subtract(1, type).toString()
  }
  return ''
}

/**
 * 指定した日時から曜日を'0' ~ '6'で取得する
 */
export const formatDayOfWeek = (date: string): string => {
  if (dayjs(date).isValid()) {
    return dayjs(date).tz('Asia/Tokyo').format('d')
  }
  return ''
}

/**
 * 今週の月曜日の日付を取得し、文字列に変換する
 */
export const getThisMondayDay = (date: string): string => {
  if (!dayjs(date).isValid()) return ''
  const weekStart = dayjs(date).tz('Asia/Tokyo').startOf('week')
  // NOTE: dateが日曜日の場合、先週(6日前)の月曜日を返す
  if (formatDayOfWeek(date) === DAY_OF_WEEK.SUNDAY) {
    return addDay(weekStart.subtract(1, 'week').toString())
  }
  return addDay(weekStart.toString())
}

/**
 * 今週の日曜日の日付を取得し、文字列に変換する
 */

export const getThisSundayDay = (date: string): string => {
  if (!dayjs(date).isValid()) return ''
  const weekEnd = dayjs(date).tz('Asia/Tokyo').endOf('week')
  // NOTE: dateが日曜日の場合、本日の日付を返す
  if (formatDayOfWeek(date) === DAY_OF_WEEK.SUNDAY) {
    return date.toString()
  }
  return weekEnd.add(1, 'day').toString()
}
