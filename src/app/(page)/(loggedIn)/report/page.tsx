import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import {
  addDay,
  currentTimeDate,
  formatDate,
  formatMonthDayWithDayOfWeek,
  formatYear,
  getBeginningMonth,
  getEndMonth,
  getThisSaturDay,
  getThisSundayDay,
  subtractDay,
} from '@/utils/format'

import WaterBarChart from '@/components/modules/WaterBarChart'
import { WaterCalendar } from '@/components/modules/WaterCalendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'
import { PagePath } from '@/constants/urls'

export const metadata: Metadata = {
  title: 'レポート',
}

const ReportPage = async ({
  searchParams,
}: {
  searchParams?: { week: string; month: string }
}) => {
  const week = searchParams?.week ?? formatDate(currentTimeDate)
  const month = searchParams?.month ?? formatDate(currentTimeDate)

  const weekResponse = await fetchWaters({
    start: formatDate(getThisSundayDay(week)),
    end: formatDate(getThisSaturDay(week)),
  })
  const weekWaters = (await weekResponse.json()) as WaterResponse[]

  const monthResponse = await fetchWaters({
    start: formatDate(getBeginningMonth(month)),
    end: formatDate(getEndMonth(month)),
  })
  const monthWaters = (await monthResponse.json()) as WaterResponse[]
  return (
    <div className='pt-8 pb-16 px-4'>
      <Card className='mb-4'>
        <CardHeader className='block'>
          <p className='font-extrabold text-center text-gray-800'>{formatYear(week)}年</p>
          <div className='font-extrabold text-center text-gray-800 flex justify-center gap-2'>
            <Link
              href={PagePath.loggedIn.reportWithDate(
                formatDate(getThisSundayDay(subtractDay(week, 'week'))),
                month,
              )}
              rel='prev'
            >
              <ArrowLeftIcon className='h-6 w-6 text-gray-800' />
            </Link>
            <p>{formatMonthDayWithDayOfWeek(getThisSundayDay(week))}</p>
            <p>~</p>
            <p>{formatMonthDayWithDayOfWeek(getThisSaturDay(week))}</p>
            <Link
              href={PagePath.loggedIn.reportWithDate(
                formatDate(getThisSundayDay(addDay(week, 'week'))),
                month,
              )}
              rel='next'
            >
              <ArrowRightIcon className='h-6 w-6 text-gray-800' />
            </Link>
          </div>
        </CardHeader>
        <CardContent className='mt-4 h-40 pl-0'>
          <WaterBarChart waters={weekWaters} />
        </CardContent>
      </Card>
      <Card className='flex justify-center p-2'>
        <WaterCalendar month={month} waters={monthWaters} week={week} />
      </Card>
    </div>
  )
}

export default ReportPage
