import { LoaderIcon } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { GoPlus } from 'react-icons/go'
import { IoIosArrowForward } from 'react-icons/io'

import { currentTimeDate, formatDate } from '@/utils/format'

import { WaterFormSheet } from '@/components/containers/WaterFormSheet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SheetTrigger } from '@/components/ui/sheet'

import ServerTodayVolume from '@/app/(page)/(loggedIn)/(home)/_components/ServerTodayVolume'
import ServerWaterBarChart from '@/app/(page)/(loggedIn)/(home)/_components/ServerWaterBarChart'
import { PagePath } from '@/constants/urls'

export const metadata: Metadata = {
  title: 'ホーム',
}

const HomePage = () => {
  const currentDate = formatDate(currentTimeDate)

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

      <Link className='text-primary mt-4' href={PagePath.loggedIn.list}>
        <Card className='mb-4'>
          <CardHeader>
            <CardTitle className='text-xl font-extrabold'> 本日の水分量</CardTitle>
          </CardHeader>
          <CardContent className='text-blue-700  flex items-center justify-between'>
            <Suspense fallback={<LoaderIcon className='animate-spin' />}>
              <ServerTodayVolume />
            </Suspense>
            <IoIosArrowForward size='28px' />
          </CardContent>
        </Card>
      </Link>
      <Link href={PagePath.loggedIn.report}>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <div className='flex items-center justify-between w-full'>
              <p className='text-xl font-extrabold'>週間</p>
              <IoIosArrowForward className='text-primary' size='28px' />
            </div>
          </CardHeader>
          <CardContent className='mt-4 h-40 p-0'>
            <Suspense fallback={<LoaderIcon className='animate-spin' />}>
              <ServerWaterBarChart />
            </Suspense>
          </CardContent>
        </Card>
      </Link>
      <WaterFormSheet date={currentDate}>
        <SheetTrigger className='block mx-auto mb-12'>
          <GoPlus
            className='shadow-2xl w-16  h-16 bg-primary text-white rounded-full fixed right-4 bottom-20 md:fixed-center-right'
            size='30px'
          />
        </SheetTrigger>
      </WaterFormSheet>
    </div>
  )
}

export default HomePage
