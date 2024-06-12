'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { type DayContentProps } from 'react-day-picker'

import { addDay, formatData } from '@/utils/format'

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
      const target = formatData(date.toDateString())
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
    (water) => formatData(water.DrankAt) === formatData(props.date.toDateString()),
  )
  const volume = targetWater.reduce((acc, cur) => acc + cur.Volume, 0)
  return (
    <span style={{ position: 'relative', overflow: 'visible' }}>
      <p>{date}</p>
      <p>{volume}</p>
    </span>
  )
}
