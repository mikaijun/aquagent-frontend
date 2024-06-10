import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import {
  addDay,
  currentTimeDate,
  formatData,
  formatDataWithDayOfWeek,
  getThisMondayDay,
  getThisSundayDay,
  subtractDay,
} from '@/utils/format'

import WaterBarChart from '@/components/modules/WaterBarChart'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'
import { PagePath } from '@/constants/urls'

export const metadata: Metadata = {
  title: 'レポート',
}

const ReportPage = async ({ searchParams }: { searchParams?: { date: string } }) => {
  const date = searchParams?.date ?? formatData(currentTimeDate)

  const res = await fetchWaters({
    start: getThisMondayDay(date),
    end: getThisSundayDay(date),
  })
  const waters = (await res.json()) as WaterResponse[]
  return (
    <div className='pt-8 pb-16 px-4'>
      <div className='mb-4'>
        <div className='font-extrabold text-center text-gray-800 flex gap-1 justify-around'>
          <p>{formatDataWithDayOfWeek(getThisMondayDay(date))}</p>
          <p>~</p>
          <p>{formatDataWithDayOfWeek(getThisSundayDay(date))}</p>
        </div>
      </div>
      <Card className='grid gap-4 sm:grid-cols-2 xl:grid-cols-2'>
        <CardHeader className='flex flex-row items-center justify-between px-4 flex py-2'>
          <Link
            href={PagePath.loggedIn.reportWithDate(formatData(subtractDay(date, 'week')))}
            rel='prev'
          >
            <ArrowLeftIcon className='h-6 w-6 text-gray-800' />
          </Link>
          <Link
            href={PagePath.loggedIn.reportWithDate(formatData(addDay(date, 'week')))}
            rel='next'
          >
            <ArrowRightIcon className='h-6 w-6 text-gray-800' />
          </Link>
        </CardHeader>
        <CardContent className='mt-4 h-40 p-0'>
          <WaterBarChart waters={waters} />
        </CardContent>
      </Card>
    </div>
  )
}

export default ReportPage
