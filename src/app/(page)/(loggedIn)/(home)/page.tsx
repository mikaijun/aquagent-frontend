import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
import { GoPlus } from 'react-icons/go'
import { IoIosArrowForward } from 'react-icons/io'

import {
  currentTimeDate,
  formatDate,
  getThisSaturDay,
  getThisSundayDay,
} from '@/utils/format'

import { WaterFormSheet } from '@/components/containers/WaterFormSheet'
import WaterBarChart from '@/components/modules/WaterBarChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SheetTrigger } from '@/components/ui/sheet'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'
import { PagePath } from '@/constants/urls'

export const metadata: Metadata = {
  title: 'ホーム',
}

const HomePage = async () => {
  const currentDate = formatDate(currentTimeDate)

  const res = await fetchWaters({
    start: formatDate(getThisSundayDay(currentDate)),
    end: formatDate(getThisSaturDay(currentDate)),
  })
  const waters = (await res.json()) as WaterResponse[]
  const todayRes = await fetchWaters({
    start: formatDate(currentDate),
    end: formatDate(currentDate),
  })
  const todayWaters = (await todayRes.json()) as WaterResponse[]

  const todayVolume = todayWaters.reduce((acc, cur) => acc + cur.Volume, 0)
  return (
    <div className='pt-8 pb-16 px-4'>
      <div className='flex items-start mb-2'>
        <Image
          alt='logo'
          className='mt-20'
          height={120}
          src='/character/wink.png'
          width={120}
        />
        <div className='base balloon'>
          <p>こんにちは！</p>
          <p>今日も水分補給を忘れずに！</p>
        </div>
      </div>

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
      <a href={PagePath.loggedIn.report}>
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
      </a>
      <WaterFormSheet date={currentDate}>
        <SheetTrigger className='block mx-auto mb-12'>
          <GoPlus
            className='shadow-2xl w-12  h-12 bg-primary text-white rounded-full fixed right-4 bottom-20'
            size='30px'
          />
        </SheetTrigger>
      </WaterFormSheet>
    </div>
  )
}

export default HomePage
