'use client'

import { IoIosArrowForward } from 'react-icons/io'

import WaterBarChart from '@/components/modules/WaterBarChart'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { WaterResponse } from '@/app/(action)/water'

type WeeklyWatersProps = {
  waters: WaterResponse[]
}

const WeeklyWaters: React.FC<WeeklyWatersProps> = ({ waters }) => {
  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-2'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <div className='flex items-center justify-between w-full'>
            <p className='text-xl font-extrabold'>週間</p>
            <IoIosArrowForward className='text-primary' size='28px' />
          </div>
        </CardHeader>
        <CardContent className='mt-4 h-40 p-0'>
          <WaterBarChart waters={waters} />
        </CardContent>
      </Card>
    </div>
  )
}

export default WeeklyWaters