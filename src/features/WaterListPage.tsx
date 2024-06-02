'use client'

import dayjs from 'dayjs'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { WaterResponse } from '@/app/(action)/water'
import { PagePath } from '@/constants/urls'
import { WaterScrollArea } from '@/modules/WaterScrollArea'

type WaterListPageProps = {
  waters: WaterResponse[]
  date: string
}

const WaterListPage: React.FC<WaterListPageProps> = ({ waters, date }) => {
  const total = waters.reduce((acc, cur) => acc + cur.Volume, 0)
  const router = useRouter()

  const handlePreviousDay = () => {
    const targetDay = dayjs(date).subtract(1, 'day').format('YYYY-MM-DD')
    router.push(PagePath.loggedIn.listWithDate(targetDay))
  }

  const handleNextDay = () => {
    const targetDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD')
    router.push(PagePath.loggedIn.listWithDate(targetDay))
  }

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center mb-4'>
        <button className='p-2' onClick={handlePreviousDay}>
          <ArrowLeftIcon className='h-6 w-6 text-gray-800' />
        </button>
        <p className='text-2xl font-extrabold text-center text-gray-800 mx-4'>
          {dayjs(date).format('YYYY年MM月DD日')}
        </p>
        <button className='p-2' onClick={handleNextDay}>
          <ArrowRightIcon className='h-6 w-6 text-gray-800' />
        </button>
      </div>
      <p className='text-4xl font-extrabold text-center text-blue-700 mb-4'>{total}ml</p>
      <WaterScrollArea
        className='max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 shadow-2xl'
        scrollAreaHeight='h-[480px]'
        waters={waters}
      />
    </div>
  )
}

export default WaterListPage
