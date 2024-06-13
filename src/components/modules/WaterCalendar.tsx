'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { type DayContentProps } from 'react-day-picker'

import { addDay, formatDate } from '@/utils/format'

import { Calendar } from '@/components/ui/calendar'

import { WaterResponse } from '@/app/(action)/water'
import { PagePath } from '@/constants/urls'

type WaterCalendarProps = {
  waters: WaterResponse[]
  week: string
  month: string
}

export const WaterCalendar: React.FC<WaterCalendarProps> = ({ waters, week, month }) => {
  console.log(waters)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const router = useRouter()
  const handlePrevClick = useCallback(() => {
    router.push(PagePath.loggedIn.reportWithDate(week, addDay(month, 'month')))
  }, [week, month, router])

  const handleMonthChange = useCallback(
    (date: Date) => {
      const target = formatDate(date.toDateString())
      router.push(PagePath.loggedIn.reportWithDate(week, target))
    },
    [router, week],
  )

  return (
    <Calendar
      className='rounded-md border'
      components={{
        DayContent: (props) => <CustomDayContent {...props} waters={waters} />,
      }}
      mode='single'
      selected={date}
      onMonthChange={handleMonthChange}
      onPrevClick={handlePrevClick}
      onSelect={setDate}
    />
  )
}

type CustomDayContentProps = DayContentProps & {
  waters: WaterResponse[]
}

const CustomDayContent: React.FC<CustomDayContentProps> = ({ waters, ...props }) => {
  const date = props.date.getDate()
  const targetWater = waters.filter(
    (water) => formatDate(water.DrankAt) === formatDate(props.date.toDateString()),
  )
  const volume = targetWater.reduce((acc, cur) => acc + cur.Volume, 0)
  return (
    <div style={{ position: 'relative', overflow: 'visible' }}>
      <p className='text-xs'>{date}</p>
      <p className='text-[10px]'>
        {volume}
        <span className='text-[6px]'>ml</span>
      </p>
    </div>
  )
}
