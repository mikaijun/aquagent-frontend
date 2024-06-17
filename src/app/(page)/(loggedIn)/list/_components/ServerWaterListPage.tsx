import WaterListPage from '@/components/containers/WaterListPage'

import { WaterResponse, fetchWaters } from '@/app/(action)/water'

type ServerWaterListPageProps = {
  date: string
}

const ServerWaterListPage: React.FC<ServerWaterListPageProps> = async ({ date }) => {
  const res = await fetchWaters({
    start: date,
    end: date,
  })
  const waters = (await res.json()) as WaterResponse[]
  return <WaterListPage date={date} waters={waters} />
}

export default ServerWaterListPage
