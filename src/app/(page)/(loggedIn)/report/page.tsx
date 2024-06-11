import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import {
  addDay,
  currentTimeDate,
  formatData,
  formatMonthDayWithDayOfWeek,
  formatYear,
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
      <Card>
        <CardHeader className='block'>
          <p className='font-extrabold text-center text-gray-800'>{formatYear(date)}年</p>
          <div className='font-extrabold text-center text-gray-800 flex justify-center gap-2'>
            <Link
              href={PagePath.loggedIn.reportWithDate(
                formatData(subtractDay(date, 'week')),
              )}
              rel='prev'
            >
              <ArrowLeftIcon className='h-6 w-6 text-gray-800' />
            </Link>
            <p>{formatMonthDayWithDayOfWeek(getThisMondayDay(date))}</p>
            <p>~</p>
            <p>{formatMonthDayWithDayOfWeek(getThisSundayDay(date))}</p>
            <Link
              href={PagePath.loggedIn.reportWithDate(formatData(addDay(date, 'week')))}
              rel='next'
            >
              <ArrowRightIcon className='h-6 w-6 text-gray-800' />
            </Link>
          </div>
        </CardHeader>
        <CardContent className='mt-4 h-40 pl-0'>
          <WaterBarChart waters={waters} />
        </CardContent>
      </Card>
    </div>
  )
}

export default ReportPage
