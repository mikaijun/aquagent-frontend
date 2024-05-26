import dayjs from 'dayjs'
import { Metadata } from 'next'

import { Card } from '@/components/ui/card'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'
import WaterForm from '@/page/water/WaterForm'
import WaterList from '@/pagewater/WaterList'

export const metadata: Metadata = {
  title: 'ホーム',
}

export default async function Home() {
  const today = dayjs().format('YYYY-MM-DD')
  const res = await fetchWaters({ date: today })
  const waters = (await res.json()) as WaterResponse[]
  const total = waters.reduce((acc, cur) => acc + cur.Volume, 0)
  return (
    <div>
      <p className='text-3xl font-bold mb-4'>飲んだ水を記録</p>
      <Card className='shadow-lg p-6 w-full max-w-sm m-auto mb-8'>
        <WaterForm />
      </Card>
      <p className='text-3xl font-bold mb-4'>本日の水分量</p>
      <p className='text-3xl font-bold text-blue-700 mb-4'>{total}ml</p>
      <WaterList className='max-w-sm m-auto' waters={waters} />
    </div>
  )
}
