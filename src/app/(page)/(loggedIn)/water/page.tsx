import { WaterResponse, fetchWaters } from '@/action/water'
import WaterInformation from '@/page/water/WaterInformation'

export default async function Water() {
  const res = await fetchWaters()
  const waters = (await res.json()) as WaterResponse[]

  return (
    <>
      <h3>水分量</h3>
      <ul>
        {waters.map((water) => (
          <div key={water.ID} style={{ marginBottom: '20px' }}>
            <WaterInformation water={water} />
          </div>
        ))}
      </ul>
    </>
  )
}
