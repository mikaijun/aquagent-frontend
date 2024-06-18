import React from 'react'

import {
  currentTimeDate,
  formatDate,
  getThisSaturDay,
  getThisSundayDay,
} from '@/utils/format'

import WaterBarChart from '@/components/modules/WaterBarChart'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'

const ServerWaterBarChart = async () => {
  const currentDate = formatDate(currentTimeDate)

  const res = await fetchWaters({
    start: formatDate(getThisSundayDay(currentDate)),
    end: formatDate(getThisSaturDay(currentDate)),
  })
  const waters = (await res.json()) as WaterResponse[]

  return <WaterBarChart waters={waters} />
}

export default ServerWaterBarChart
