'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

import { WaterResponse, saveWater } from '@/action/water'

type WaterFormProps = {
  water?: WaterResponse
  onSave?: () => void
}

const WaterForm: React.FC<WaterFormProps> = ({ water, onSave }) => {
  const [volume, setVolume] = useState<number>(water?.Volume || 50)
  const router = useRouter()

  const handleSave = useCallback(async () => {
    const res = await saveWater({ id: water?.ID || 0, volume })
    if (res) {
      alert('保存しました')
      if (onSave) {
        onSave()
        router.refresh()
      }
    }
  }, [volume, water, onSave, router])

  const hoge = (value: number[]) => {
    setVolume(value[0])
  }

  return (
    <div className='max-w-md'>
      <div className='mb-4 relative h-20'>
        <Slider max={500} min={50} step={50} onValueChange={hoge} />
        <p className='my-2 text-center'>現在の量: {volume} ml</p>
        <p className='absolute left-[10%]'>100</p>
        <p className='absolute left-[43%]'>250</p>
        <p className='absolute left-[92%]'>500</p>
        <input name='volume' type='hidden' />
      </div>
      <Button className='block m-auto' onClick={handleSave}>
        記録する
      </Button>
    </div>
  )
}

export default WaterForm
