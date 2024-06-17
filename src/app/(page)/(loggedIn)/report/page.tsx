import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { LoaderIcon } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

import {
  addDay,
  currentTimeDate,
  formatDate,
  formatMonthDayWithDayOfWeek,
  formatYear,
  getThisSaturDay,
  getThisSundayDay,
  subtractDay,
} from '@/utils/format'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

import ServerWaterBarChart from '@/app/(page)/(loggedIn)/report/_components/ServerWaterBarChart'
import ServerWaterCalendar from '@/app/(page)/(loggedIn)/report/_components/ServerWaterCalendar'
import { PagePath } from '@/constants/urls'

export const metadata: Metadata = {
  title: 'レポート',
}

const ReportPage = ({
  searchParams,
}: {
  searchParams?: { week: string; month: string }
}) => {
  const week = searchParams?.week ?? formatDate(currentTimeDate)
  const month = searchParams?.month ?? formatDate(currentTimeDate)

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
        <CardContent className='mt-4 h-40 pl-0 flex justify-center'>
          <Suspense fallback={<LoaderIcon className='animate-spin' />}>
            <ServerWaterBarChart week={week} />
          </Suspense>
        </CardContent>
      </Card>
      <Card className='flex justify-center p-2'>
        <Suspense fallback={<LoaderIcon className='animate-spin' />}>
          <ServerWaterCalendar month={month} week={week} />
        </Suspense>
      </Card>
    </div>
  )
}

export default ReportPage
