import { Metadata } from 'next'

import { currentTimeDate, formatDate } from '@/utils/format'

import WaterListPage from '@/components/containers/WaterListPage'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'

export const metadata: Metadata = {
  title: '一覧',
}

const ListPage = async ({ searchParams }: { searchParams?: { date: string } }) => {
  const date = searchParams?.date ?? formatDate(currentTimeDate)
  const res = await fetchWaters({ date })
  const waters = (await res.json()) as WaterResponse[]
  return <WaterListPage date={date} waters={waters} />
}

export default ListPage
