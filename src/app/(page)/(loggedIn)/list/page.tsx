import dayjs from 'dayjs'
import { Metadata } from 'next'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'
import WaterList from '@/page/water/WaterList'

export const metadata: Metadata = {
  title: '一覧',
}

const ListPage = async ({ searchParams }: { searchParams?: { date: string } }) => {
  const date = searchParams?.date ?? dayjs().format('YYYY-MM-DD')
  const res = await fetchWaters({ date })
  const waters = (await res.json()) as WaterResponse[]
  return <WaterList date={date} waters={waters} />
}

export default ListPage
