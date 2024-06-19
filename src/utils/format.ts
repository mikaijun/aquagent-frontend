import dayjs, { ManipulateType } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/ja'
dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('Asia/Tokyo')

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
    case DAY_OF_WEEK.SUNDAY:
      return '(日)'
    default:
      return ''
  }
}

/**
 * VercelのデフォルトでTimezoneがUTCにならないようにする
 * https://zenn.dev/kohki_s/articles/a77ac4badf0f3c
 */
const formatDayjs = (date?: string | null) => {
  if (date) {
    return dayjs(date).tz()
  }
  return dayjs(date).tz()
}

/**
 * 現在日時を文字列として取得する
 */
export const currentTimeDate = formatDayjs().toString()

/**
 * 現在日時からHHを取得する
 */
export const currentHour = formatDayjs().format('HH')

/**
 * 現在日時からmmを取得する
 */
export const currentMinutes = formatDayjs().format('mm')

/**
 * 指定した日付をYYYY/MM/DDに変換する
 */
export const formatDate = (data: string | null): string => {
  if (!dayjs(data).isValid()) return ''
  return dayjs(data).tz('Asia/Tokyo').format('YYYY-MM-DD')
}

/**
 * 指定した日付をYYYY/MM/DD (曜日)に変換する
 */
export const formatDateWithDayOfWeek = (date: string | null): string => {
  if (!dayjs(date).isValid()) return ''
  const value = formatDate(date)
  return value + japaneseWeek(value)
}

/**
 * 指定した日程からをYYYYに変換する
 */
export const formatYear = (date: string | null): string => {
  if (!dayjs(date).isValid()) return ''
  return formatDayjs(date).format('YYYY')
}

/**
 * 指定した日程からをMMに変換する
 */
export const formatMonth = (date: string | null): string => {
  if (!dayjs(date).isValid()) return ''
  return formatDayjs(date).format('MM')
}

/**
 * 指定した日付をMM/DD (曜日)に変換する
 */
export const formatMonthDayWithDayOfWeek = (date: string | null): string => {
  if (!dayjs(date).isValid()) return ''
  const value = formatDayjs(date).format('MM/DD')
  return value + japaneseWeek(value)
}

/**
 * 指定した日付をYYYY/MM/DD HH:mmに変換する
 */
export const formatDateWithTime = (date: string | null): string => {
  if (!dayjs(date).isValid()) return ''
  return formatDayjs(date).format('YYYY/MM/DD HH:mm')
}

/**
 * 指定した日時からHH:mmに変換する
 */
export const formatTime = (date: string | null): string => {
  if (!dayjs(date).isValid()) return ''
  return formatDayjs(date).format('HH:mm')
}

/**
 * 指定した日時からHHに変換する
 */
export const formatHour = (date: string | null): string => {
  if (!dayjs(date).isValid()) return ''
  return formatDayjs(date).format('HH')
}

/**
 * 指定した日時からx後の日時を取得、文字列に変換する
 */
export const addDay = (date: string, type: ManipulateType = 'day'): string => {
  if (!dayjs(date).isValid()) return ''
  return formatDayjs(date).add(1, type).toString()
}

/**
 * 指定した日時からx前の日時を取得、文字列に変換する
 */
export const subtractDay = (date: string, type: ManipulateType = 'day'): string => {
  if (!dayjs(date).isValid()) return ''
  return formatDayjs(date).subtract(1, type).toString()
}

/**
 * 指定した日時から曜日を'0' ~ '6'で取得する
 */
export const formatDayOfWeek = (date: string): string => {
  if (!dayjs(date).isValid()) return ''
  return formatDayjs(date).format('d')
}

/**
 * 今週の開始日(日曜日)の日付を取得し、文字列に変換する
 */

export const getThisSundayDay = (date: string): string => {
  if (!dayjs(date).isValid()) return ''
  return formatDayjs(date).startOf('week').toString()
}

/**
 * 今週の終了日(土曜日)の日付を取得し、文字列に変換する
 */
export const getThisSaturDay = (date: string): string => {
  if (!dayjs(date).isValid()) return ''
  return formatDayjs(date).endOf('week').toString()
}

/**
 * 指定した日時の月初の日付を取得し、文字列に変換する
 */

export const getBeginningMonth = (date: string): string => {
  if (!dayjs(date).isValid()) return ''
  return formatDayjs(date).startOf('month').toString()
}

/**
 * 指定した日時の月末の日付を取得し、文字列に変換する
 */

export const getEndMonth = (date: string): string => {
  if (!dayjs(date).isValid()) return ''
  return formatDayjs(date).endOf('month').toString()
}
