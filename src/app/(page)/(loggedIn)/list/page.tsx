import { Metadata } from 'next'

import { formatToday } from '@/utils/format'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'
import WaterListPage from '@/features/WaterListPage'

export const metadata: Metadata = {
  title: '一覧',
}

const ListPage = async ({ searchParams }: { searchParams?: { date: string } }) => {
  const date = searchParams?.date ?? formatToday()
  const res = await fetchWaters({ date })
  const waters = (await res.json()) as WaterResponse[]
  return <WaterListPage date={date} waters={waters} />
}

export default ListPage
