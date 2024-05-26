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
