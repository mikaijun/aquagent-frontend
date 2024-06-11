'use client'

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { GoPlus } from 'react-icons/go'

import { addDay, formatData, formatDataWithDayOfWeek, subtractDay } from '@/utils/format'

import { WaterFormSheet } from '@/components/containers/WaterFormSheet'
import { WaterScrollArea } from '@/components/modules/WaterScrollArea'
import { SheetTrigger } from '@/components/ui/sheet'

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
    const targetDay = formatData(subtractDay(date))
    router.push(PagePath.loggedIn.listWithDate(targetDay))
  }

  const handleNextDay = () => {
    const targetDay = formatData(addDay(date))
    router.push(PagePath.loggedIn.listWithDate(targetDay))
  }

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center mb-4'>
        <button className='p-2' onClick={handlePreviousDay}>
          <ArrowLeftIcon className='h-6 w-6 text-gray-800' />
        </button>
        <p className='text-xl font-extrabold text-center text-gray-800 mx-4'>
          {formatDataWithDayOfWeek(date)}
        </p>
        <button className='p-2' onClick={handleNextDay}>
          <ArrowRightIcon className='h-6 w-6 text-gray-800' />
        </button>
      </div>
      <div className='flex items-center justify-between mb-4 px-4'>
        <p className='text-4xl font-extrabold text-blue-700 flex-1 text-center'>
          {total}ml
        </p>
        <WaterFormSheet date={date}>
          <SheetTrigger>
            <div className='bg-primary text-white rounded-lg p-1'>
              <GoPlus size='36px' />
            </div>
          </SheetTrigger>
        </WaterFormSheet>
      </div>
      <WaterScrollArea
        className='max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 shadow-2xl'
        scrollAreaHeight='h-80'
        waters={waters}
      />
    </div>
  )
}

export default WaterListPage
