import dayjs from 'dayjs'
// NOTE: Vercel デフォルトでTimezoneがUTCにならないようにする
// https://zenn.dev/kohki_s/articles/a77ac4badf0f3c
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * 今日の日時を取得し、文字列に変換する
 */
export const getCurrentTimeDate = (): string => {
  return dayjs().tz('Asia/Tokyo').toString()
}

/**
 * 指定した日付をYYYY-MM-DDに変換する
 */
export const formatData = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    return dayjs(data).tz('Asia/Tokyo').format('YYYY-MM-DD')
  }
  return ''
}

/**
 * 指定した日付をYYYY-MM-DD HH:mmに変換する
 */
export const formatDataWithTime = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    return dayjs(data).tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm')
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
 * 指定した日時からHHに変換する
 */
export const formatHour = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    return dayjs(data).tz('Asia/Tokyo').format('HH')
  }
  return ''
}

/**
 * 指定した日時からmmに変換する
 */
export const formatMinutes = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    return dayjs(data).tz('Asia/Tokyo').format('mm')
  }
  return ''
}
/**
 * 指定した日時から1日後の日時を取得し、文字列に変換する
 */
export const addOneDay = (date: string): string => {
  if (dayjs(date).isValid()) {
    return dayjs(date).tz('Asia/Tokyo').add(1, 'day').toString()
  }
  return ''
}

/**
 * 指定した日時から1日前の日時を取得、文字列に変換する
 */
export const subtractOneDay = (date: string): string => {
  if (dayjs(date).isValid()) {
    return dayjs(date).tz('Asia/Tokyo').subtract(1, 'day').toString()
  }
  return ''
}

/**
 * 指定したHH:mmからYYYY-MM-DD HH:mmに変換する。YYYY-MM-DDは本日の日付
 */
export const hoge = (time: string): string => {
  const today = formatData(getCurrentTimeDate())
  return `${today}-${time}`
}
