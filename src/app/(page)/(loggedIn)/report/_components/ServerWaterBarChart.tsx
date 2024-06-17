import { formatDate, getThisSaturDay, getThisSundayDay } from '@/utils/format'

import WaterBarChart from '@/components/modules/WaterBarChart'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'

type ServerWaterBarChartProps = {
  week: string
}

const ServerWaterBarChart: React.FC<ServerWaterBarChartProps> = async ({ week }) => {
  const weekResponse = await fetchWaters({
    start: formatDate(getThisSundayDay(week)),
    end: formatDate(getThisSaturDay(week)),
  })
  const waters = (await weekResponse.json()) as WaterResponse[]

  return <WaterBarChart waters={waters} />
}

export default ServerWaterBarChart
