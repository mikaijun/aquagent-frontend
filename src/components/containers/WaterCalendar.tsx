'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { type DayContentProps } from 'react-day-picker'

import { addDay, formatDate } from '@/utils/format'

import WaterAddButton from '@/components/containers/WaterAddButton'
import { Calendar } from '@/components/ui/calendar'

import { WaterResponse } from '@/app/(action)/water'
import { PagePath } from '@/constants/urls'

type WaterCalendarProps = {
  waters: WaterResponse[]
  week: string
  month: string
}

export const WaterCalendar: React.FC<WaterCalendarProps> = ({ waters, week, month }) => {
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
    <div>
      <Calendar
        className='rounded-md border bg-white'
        components={{
          DayContent: (props) => <CustomDayContent {...props} waters={waters} />,
        }}
        mode='single'
        selected={date}
        onMonthChange={handleMonthChange}
        onPrevClick={handlePrevClick}
        onSelect={setDate}
      />
      <WaterAddButton date={formatDate(date?.toString() ?? '')} />
    </div>
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
      <p>{date}</p>
      <p className='text-[10px]'>
        {volume}
        <span className='text-[6px]'></span>
      </p>
    </div>
  )
}
