import { Metadata } from 'next'
import React from 'react'
import { GoPlus } from 'react-icons/go'
import { IoIosArrowForward } from 'react-icons/io'

import {
  currentTimeDate,
  formatData,
  getThisMondayDay,
  getThisSundayDay,
} from '@/utils/format'

import { WaterFormSheet } from '@/components/containers/WaterFormSheet'
import WeeklyWaters from '@/components/containers/WeeklyWaters'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SheetTrigger } from '@/components/ui/sheet'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'
import { PagePath } from '@/constants/urls'

export const metadata: Metadata = {
  title: 'ホーム',
}

const HomePage = async () => {
  const currentDate = formatData(currentTimeDate)

  const res = await fetchWaters({
    start: getThisMondayDay(currentDate),
    end: getThisSundayDay(currentDate),
  })
  const waters = (await res.json()) as WaterResponse[]
  const todayWaters = waters.filter((water) => formatData(water.DrankAt) === currentDate)
  const todayVolume = todayWaters.reduce((acc, cur) => acc + cur.Volume, 0)
  console.log('currentDate', currentDate)
  console.log(waters.map((water) => console.log('drankAt', formatData(water.DrankAt))))
  return (
    <div className='pt-8 pb-16 px-4'>
      <WaterFormSheet date={currentDate}>
        <SheetTrigger className='block mx-auto mb-12'>
          <Card className='shadow-2xl p-4 w-full max-w-lg mx-auto  bg-primary text-white rounded-lg flex items-center'>
            <p className='text-xl font-bold'>飲んだ水を記録する</p>
            <GoPlus size='30px' />
          </Card>
        </SheetTrigger>
      </WaterFormSheet>
      <a className='text-primary mt-4' href={PagePath.loggedIn.list}>
        <Card className='mb-4'>
          <CardHeader>
            <CardTitle className='text-xl font-extrabold'> 本日の水分量</CardTitle>
          </CardHeader>
          <CardContent className='text-blue-700  flex items-center justify-between'>
            <p className='font-extrabold text-4xl'>{todayVolume}ml</p>
            <IoIosArrowForward size='28px' />
          </CardContent>
        </Card>
      </a>
      <WeeklyWaters waters={waters} />
    </div>
  )
}

export default HomePage
