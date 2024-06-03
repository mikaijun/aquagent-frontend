'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'

import { saveWater } from '@/app/(action)/water'

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
  { value: '700', label: '700 ml', hint: '' },
  { value: '1000', label: '1000 ml', hint: '' },
]

type WaterFormSheetProps = {
  children: React.ReactNode
}

export const WaterFormSheet: React.FC<WaterFormSheetProps> = ({ children }) => {
  const [volume, setVolume] = useState<string>('250')
  const router = useRouter()
  const { toast } = useToast()

  const handleSave = useCallback(async () => {
    const res = await saveWater({ volume: Number(volume) })
    if (res.ID > 0) {
      toast({ title: '保存しました' })
      router.refresh()
    }
  }, [volume, router, toast])

  const handleChange = (value: string) => {
    setVolume(value)
  }
  return (
    <Sheet>
      {children}
      <SheetContent side='bottom'>
        <p className='text-primary text-center text-2xl mb-4'>{volume}ml</p>
        <RadioGroup
          className='flex flex-wrap gap-2 mb-8 justify-center'
          value={volume}
          onValueChange={(value) => handleChange(value)}
        >
          {options.map((option) => (
            <div key={option.value} className='flex flex-col items-center'>
              <Label
                className={`inline-block p-1 border rounded-lg cursor-pointer transition-colors duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-24
          ${volume === option.value ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-500 border-blue-500'}
          `}
              >
                <RadioGroupItem className='hidden' value={option.value} />
                <p className='text-center text-lg'>{option.label}</p>
              </Label>
              {option.hint && (
                <p className='mt-1 text-[10px] text-gray-500 text-center'>
                  {option.hint}
                </p>
              )}
            </div>
          ))}
        </RadioGroup>
        <div className='flex justify-center gap-4'>
          <SheetClose>
            <Button onClick={handleSave}>記録する</Button>
          </SheetClose>
          <SheetClose>
            <Button variant='secondary'>キャンセル</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
