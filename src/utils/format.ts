import dayjs from 'dayjs'

/**
 * 指定した日付をYYYY年MM月DD日 HH:mmに変換する
 */
export const formatDataJapaneseWithTime = (data: string | null): string => {
  if (dayjs(data).isValid()) {
    return dayjs(data).format('YYYY年MM月DD日 HH:mm')
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
