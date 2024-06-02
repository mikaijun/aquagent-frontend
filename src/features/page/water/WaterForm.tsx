'use client'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'

import { WaterResponse, saveWater } from '@/app/(action)/water'

const options = [
  { value: '50', label: '50 ml', hint: '試飲サイズ' },
  { value: '100', label: '100 ml', hint: '' },
  { value: '150', label: '150 ml', hint: '小さめの紙コップ' },
  { value: '200', label: '200 ml', hint: '' },
  { value: '250', label: '250 ml', hint: '一般的な紙コップ' },
  { value: '300', label: '300 ml', hint: '' },
  { value: '350', label: '350 ml', hint: 'テイクアウトカップ' },
  { value: '400', label: '400 ml', hint: '' },
  { value: '500', label: '500 ml', hint: 'ペットボトル' },
  { value: '1000', label: '1000 ml', hint: '' },
]

type WaterFormProps = {
  water?: WaterResponse
  onSave?: () => void
}

const WaterForm: React.FC<WaterFormProps> = ({ water, onSave }) => {
  const [volume, setVolume] = useState<string>(water?.Volume.toString() || '')
  const router = useRouter()
  const { toast } = useToast()

  const handleSave = useCallback(async () => {
    const res = await saveWater({ id: water?.ID || 0, volume: Number(volume) })
    if (res) {
      toast({ title: '保存しました' })
      router.refresh()
      if (onSave) {
        onSave()
      }
    }
  }, [volume, water?.ID, onSave, router, toast])

  const handleChange = (value: string) => {
    setVolume(value)
  }

  return (
    <>
      <RadioGroup
        className='flex flex-wrap gap-4'
        value={volume}
        onValueChange={(value) => handleChange(value)}
      >
        {options.map((option) => (
          <div key={option.value} className='flex flex-col items-center'>
            <Label
              className={`inline-block px-4 py-2 border rounded-lg cursor-pointer transition-colors duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-24
          ${volume === option.value ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-500 border-blue-500'}
          `}
            >
              <RadioGroupItem className='hidden' value={option.value} />
              <p className='text-center'>{option.label}</p>
            </Label>
            {option.hint && (
              <p className='mt-1 text-[10px] text-gray-500 text-center'>{option.hint}</p>
            )}
          </div>
        ))}
      </RadioGroup>
      <Button className='block m-auto' onClick={handleSave}>
        記録する
      </Button>
    </>
  )
}

export default WaterForm
