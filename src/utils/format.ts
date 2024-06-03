import dayjs, { Dayjs } from 'dayjs'
// NOTE: Vercel デフォルトでTimezoneがUTCにならないようにする
// https://zenn.dev/kohki_s/articles/a77ac4badf0f3c
import timezone from 'dayjs/plugin/timezone'
import ja from 'dayjs/plugin/utc'
dayjs.extend(ja)
dayjs.extend(timezone)

/**
 * 今日の日付を取得する
 */
export const getToday = (): Dayjs => {
  return dayjs()
}

/**
 * 指定した日付をYYYY-MM-DDに変換する
 */
export const formatData = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    return dayjs(data).format('YYYY-MM-DD')
  }
  return ''
}

/**
 * 指定した日付をYYYY-MM-DD HH:mmに変換する
 */
export const formatDataWithTime = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    return dayjs(data).format('YYYY-MM-DD HH:mm')
  }
  return ''
}

/**
 * 指定した日時からHH:mmに変換する
 */
export const formatTime = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    return dayjs(data).format('HH:mm')
  }
  return ''
}

/**
 * 指定した日時から1日後の日時を取得し、文字列に変換する
 */
export const addOneDay = (date: string): string => {
  if (dayjs(date).isValid()) {
    return dayjs(date).add(1, 'day').toString()
  }
  return ''
}

/**
 * 指定した日時から1日前の日時を取得、文字列に変換する
 */
export const subtractOneDay = (date: string): string => {
  if (dayjs(date).isValid()) {
    return dayjs(date).subtract(1, 'day').toString()
  }
  return ''
}
