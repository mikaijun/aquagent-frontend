'use client'

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { addDay, formatDate, formatDateWithDayOfWeek, subtractDay } from '@/utils/format'

import WaterAddButton from '@/components/containers/WaterAddButton'
import { WaterScrollArea } from '@/components/modules/WaterScrollArea'

import { WaterResponse } from '@/app/(action)/water'
import { PagePath } from '@/constants/urls'

type WaterListPageProps = {
  waters: WaterResponse[]
  date: string
}

const WaterListPage: React.FC<WaterListPageProps> = ({ waters, date }) => {
  const total = waters.reduce((acc, cur) => acc + cur.Volume, 0)
  const router = useRouter()

  const handlePreviousDay = () => {
    const targetDay = formatDate(subtractDay(date))
    router.push(PagePath.loggedIn.listWithDate(targetDay))
  }

  const handleNextDay = () => {
    const targetDay = formatDate(addDay(date))
    router.push(PagePath.loggedIn.listWithDate(targetDay))
  }

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center mb-4'>
        <button className='p-2' onClick={handlePreviousDay}>
          <ArrowLeftIcon className='h-6 w-6 text-gray-800' />
        </button>
        <p className='text-xl font-extrabold text-center text-gray-800 mx-4'>
          {formatDateWithDayOfWeek(date)}
        </p>
        <button className='p-2' onClick={handleNextDay}>
          <ArrowRightIcon className='h-6 w-6 text-gray-800' />
        </button>
      </div>
      <div className='flex items-center justify-between mb-4 px-4'>
        <p className='text-4xl font-extrabold text-blue-700 flex-1 text-center'>
          {total}ml
        </p>
        <WaterAddButton date={date} />
      </div>
      <WaterScrollArea
        className='max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 shadow-2xl'
        scrollAreaHeight='h-96'
        waters={waters}
      />
    </div>
  )
}

export default WaterListPage
