import { Metadata } from 'next'

import { formatDataJapaneseWithTime } from '@/utils/format'

import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import { WaterResponse } from '@/app/(action)/water'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'ホーム',
}

type WaterListProps = {
  waters: WaterResponse[]
  className?: string
}

const WaterList: React.FC<WaterListProps> = ({ waters, className }) => {
  return (
    <Card className={cn('p-4 shadow-lg', className)}>
      <ScrollArea className='h-52'>
        {waters.map((water) => (
          <>
            <div key={water.ID} className='text-sm flex'>
              <p className='w-20'>{water.Volume} ml</p>
              <p>{formatDataJapaneseWithTime(water.CreatedAt)}</p>
            </div>
            <Separator className='my-2' />
          </>
        ))}
      </ScrollArea>
    </Card>
  )
}

export default WaterList
