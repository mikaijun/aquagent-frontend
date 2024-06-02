import React from 'react'

import { formatDataJapaneseWithTime } from '@/utils/format'

import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import { WaterResponse } from '@/app/(action)/water'

type WaterScrollAreaProps = {
  waters: WaterResponse[]
  scrollAreaHeight?: string
  className?: string
}

const WaterScrollArea: React.FC<WaterScrollAreaProps> = ({
  waters,
  scrollAreaHeight = 'h-52',
  className,
}) => {
  return (
    <Card className={className}>
      <ScrollArea className={scrollAreaHeight}>
        {waters.map((water, index) => (
          <React.Fragment key={index}>
            <div key={water.ID} className='text-sm flex'>
              <p className='w-20'>{water.Volume} ml</p>
              <p>{formatDataJapaneseWithTime(water.DrankAt)}</p>
            </div>
            <Separator className='my-2' />
          </React.Fragment>
        ))}
      </ScrollArea>
    </Card>
  )
}

export default WaterScrollArea
