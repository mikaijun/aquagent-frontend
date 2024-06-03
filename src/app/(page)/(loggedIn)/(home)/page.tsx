import { Metadata } from 'next'
import React from 'react'
import { GoPlus } from 'react-icons/go'
import { IoIosArrowForward } from 'react-icons/io'

import { formatToday } from '@/utils/format'

import { WaterFormSheet } from '@/components/modules/WaterFormSheet'
import { Card } from '@/components/ui/card'
import { SheetTrigger } from '@/components/ui/sheet'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'
import { PagePath } from '@/constants/urls'

export const metadata: Metadata = {
  title: 'ホーム',
}

const HomePage = async () => {
  const today = formatToday()
  const res = await fetchWaters({ date: today })
  const waters = (await res.json()) as WaterResponse[]
  const total = waters.reduce((acc, cur) => acc + cur.Volume, 0)
  return (
    <div className='py-8 px-4'>
      <WaterFormSheet>
        <SheetTrigger className='block mx-auto mb-12'>
          <Card className='shadow-2xl p-4 w-full max-w-lg mx-auto  bg-primary text-white rounded-lg flex items-center'>
            <p className='text-xl font-bold'>飲んだ水を記録する</p>
            <GoPlus size='30px' />
          </Card>
        </SheetTrigger>
      </WaterFormSheet>
      <p className='text-4xl font-extrabold text-center text-gray-800 mb-8'>
        本日の水分量
      </p>
      <a className='text-primary mt-4' href={PagePath.loggedIn.list}>
        <Card className='text-blue-700 mb-4 flex items-center p-4 justify-between'>
          <p className='font-extrabold text-4xl'>{total}ml</p>
          <IoIosArrowForward size='28px' />
        </Card>
      </a>
    </div>
  )
}

export default HomePage
