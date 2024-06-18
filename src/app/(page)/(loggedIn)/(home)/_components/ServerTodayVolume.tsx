import React from 'react'

import { currentTimeDate, formatDate } from '@/utils/format'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'

const ServerTodayVolume = async () => {
  const currentDate = formatDate(currentTimeDate)

  const todayRes = await fetchWaters({
    start: formatDate(currentDate),
    end: formatDate(currentDate),
  })
  const todayWaters = (await todayRes.json()) as WaterResponse[]

  const todayVolume = todayWaters.reduce((acc, cur) => acc + cur.Volume, 0)
  return <p className='font-extrabold text-4xl'>{todayVolume}ml</p>
}

export default ServerTodayVolume
