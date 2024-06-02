import dayjs from 'dayjs'
import { Metadata } from 'next'
import { GoPlus } from 'react-icons/go'

import { Card } from '@/components/ui/card'
import { SheetTrigger } from '@/components/ui/sheet'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'
import { WaterFormSheet } from '@/features/WaterFormSheet'
import WaterScrollArea from '@/features/modules/WaterScrollArea'

export const metadata: Metadata = {
  title: 'ホーム',
}

const HomePage = async () => {
  const today = dayjs().format('YYYY-MM-DD')
  const res = await fetchWaters({ date: today })
  const waters = (await res.json()) as WaterResponse[]
  const total = waters.reduce((acc, cur) => acc + cur.Volume, 0)
  return (
    <div className='p-4'>
      <WaterFormSheet>
        <SheetTrigger className='block mx-auto'>
          <Card className='shadow-2xl p-4 w-full max-w-lg mx-auto mb-8 bg-primary text-white rounded-lg flex items-center'>
            <p className='text-xl font-bold'>飲んだ水を記録する</p>
            <GoPlus size='30px' />
          </Card>
        </SheetTrigger>
      </WaterFormSheet>
      <p className='text-4xl font-extrabold text-center text-gray-800 mb-4'>
        本日の水分量
      </p>
      <p className='text-4xl font-extrabold text-center text-blue-700 mb-4'>{total}ml</p>
      <WaterScrollArea
        className='max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 shadow-2xl'
        waters={waters}
      />
    </div>
  )
}

export default HomePage
