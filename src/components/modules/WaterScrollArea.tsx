import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { FaTrash } from 'react-icons/fa'

import { formatTime } from '@/utils/format'

import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'

import { WaterResponse, deleteWater } from '@/app/(action)/water'

type WaterScrollAreaProps = {
  waters: WaterResponse[]
  scrollAreaHeight: string
  className?: string
}

export const WaterScrollArea: React.FC<WaterScrollAreaProps> = ({
  waters,
  scrollAreaHeight,
  className,
}) => {
  return (
    <Card className={className}>
      <ScrollArea className={scrollAreaHeight}>
        {waters.map((water, index) => (
          <React.Fragment key={index}>
            <AreaItem water={water} />
            <Separator className='my-1' />
          </React.Fragment>
        ))}
      </ScrollArea>
    </Card>
  )
}

type AreaItemProps = {
  water: WaterResponse
}

const AreaItem: React.FC<AreaItemProps> = ({ water }) => {
  const router = useRouter()
  const { toast } = useToast()
  const handleDelete = useCallback(async () => {
    const res = await deleteWater({ id: water.ID })
    if (res) {
      toast({ title: '削除しました' })
      router.refresh()
    }
  }, [water, router, toast])

  return (
    <div className='text-sm flex items-center justify-between py-1 px-4'>
      <p className='w-20 text-lg'>{water.Volume} ml</p>
      <div className='flex gap-4'>
        <p className='text-xs text-slate-500'>{formatTime(water.DrankAt)}</p>
        <FaTrash className='text-red-500 cursor-pointer' onClick={handleDelete} />
      </div>
    </div>
  )
}
