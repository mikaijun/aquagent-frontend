import { formatDate, getBeginningMonth, getEndMonth } from '@/utils/format'

import { WaterCalendar } from '@/components/modules/WaterCalendar'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'

type ServerWaterCalendarProps = {
  month: string
  week: string
}

const ServerWaterCalendar: React.FC<ServerWaterCalendarProps> = async ({
  month,
  week,
}) => {
  const monthResponse = await fetchWaters({
    start: formatDate(getBeginningMonth(month)),
    end: formatDate(getEndMonth(month)),
  })
  const waters = (await monthResponse.json()) as WaterResponse[]

  return <WaterCalendar month={month} waters={waters} week={week} />
}

export default ServerWaterCalendar
