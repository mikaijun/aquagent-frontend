'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useToast } from '@/components/ui/use-toast'

import { WaterResponse, saveWater } from '@/action/water'

type WaterFormProps = {
  water?: WaterResponse
  onSave?: () => void
}

const WaterForm: React.FC<WaterFormProps> = ({ water, onSave }) => {
  const [volume, setVolume] = useState<number>(water?.Volume || 50)
  const router = useRouter()
  const { toast } = useToast()

  const handleSave = useCallback(async () => {
    const res = await saveWater({ id: water?.ID || 0, volume })
    if (res) {
      toast({ title: '保存しました' })
      router.refresh()
      if (onSave) {
        onSave()
      }
    }
  }, [volume, water, onSave, router, toast])

  const hoge = (value: number[]) => {
    setVolume(value[0])
  }

  return (
    <>
      <div className='mb-4'>
        <p className='text-2xl font-bold mb-4'>{volume} ml</p>
        <Slider max={500} min={50} step={50} onValueChange={hoge} />
        <div className='flex justify-between mt-1'>
          <p>50ml</p>
          <p>500ml</p>
        </div>
        <input name='volume' type='hidden' />
      </div>
      <Button className='block m-auto' onClick={handleSave}>
        記録する
      </Button>
    </>
  )
}

export default WaterForm
