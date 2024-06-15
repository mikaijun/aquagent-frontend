'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts'

import { DAY_OF_WEEK, currentTimeDate, formatDate, formatDayOfWeek } from '@/utils/format'

import { WaterResponse } from '@/app/(action)/water'

type WaterBarChartProps = {
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

const WaterBarChart: React.FC<WaterBarChartProps> = ({ waters }) => {
  const currentDate = formatDate(currentTimeDate)
  console.log('currentDate', currentDate)
  waters.map((water) => console.log('water', water))
  waters.map((water) => console.log('formatDate', formatDate(water.DrankAt)))
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
          barSize={15}
          dataKey='subscription'
          style={{
            fill: 'hsl(var(--primary))',
            width: 20,
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default WaterBarChart
