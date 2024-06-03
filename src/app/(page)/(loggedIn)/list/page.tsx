import { Metadata } from 'next'

import { getToday } from '@/utils/format'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'
import WaterListPage from '@/features/WaterListPage'

export const metadata: Metadata = {
  title: '一覧',
}

const ListPage = async ({ searchParams }: { searchParams?: { date: string } }) => {
  const date = searchParams?.date ?? getToday().format('YYYY-MM-DD')
  const res = await fetchWaters({ date })
  const waters = (await res.json()) as WaterResponse[]
  return <WaterListPage date={date} waters={waters} />
}

export default ListPage
