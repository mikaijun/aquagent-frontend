'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts'

import { DAY_OF_WEEK, formatDayOfWeek } from '@/utils/format'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { WaterResponse } from '@/app/(action)/water'

type WeeklyWatersProps = {
  waters: WaterResponse[]
}

type AddDayOfWeekWatersType = WaterResponse & {
  dayOfWeek: string
}

const addDayOfWeekWaters = (waters: WaterResponse[]): AddDayOfWeekWatersType[] => {
  return waters.map((water) => ({
    ...water,
    dayOfWeek: formatDayOfWeek(water.DrankAt),
  }))
}

const calculationVolume = (waters: AddDayOfWeekWatersType[], datOfWeek: string) => {
  const targetWaters = waters.filter((water) => water.dayOfWeek === datOfWeek)
  return targetWaters.reduce((acc, cur) => acc + cur.Volume, 0)
}

const WeeklyWaters: React.FC<WeeklyWatersProps> = ({ waters }) => {
  const formatWaters = addDayOfWeekWaters(waters)
  const data = [
    { subscription: calculationVolume(formatWaters, DAY_OF_WEEK.SUNDAY), date: '日' },
    { subscription: calculationVolume(formatWaters, DAY_OF_WEEK.MONDAY), date: '月' },
    { subscription: calculationVolume(formatWaters, DAY_OF_WEEK.TUESDAY), date: '火' },
    { subscription: calculationVolume(formatWaters, DAY_OF_WEEK.WEDNESDAY), date: '水' },
    { subscription: calculationVolume(formatWaters, DAY_OF_WEEK.THURSDAY), date: '木' },
    { subscription: calculationVolume(formatWaters, DAY_OF_WEEK.FRIDAY), date: '金' },
    { subscription: calculationVolume(formatWaters, DAY_OF_WEEK.SATURDAY), date: '土' },
  ]
  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-2'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-xl font-extrabold'>週間</CardTitle>
        </CardHeader>
        <CardContent className='mt-4 h-40 p-0'>
          <ResponsiveContainer height='100%' width='100%'>
            <BarChart data={data}>
              <XAxis
                dataKey='date'
                style={{
                  fontSize: '12px',
                }}
              />
              <YAxis
                style={{
                  fontSize: '12px',
                }}
              />
              <CartesianGrid strokeDasharray='3 3' />
              <Bar
                dataKey='subscription'
                style={{
                  fill: 'hsl(var(--primary))',
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default WeeklyWaters
