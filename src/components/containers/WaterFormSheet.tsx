'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { IoTime } from 'react-icons/io5'
import { PickerValue } from 'react-mobile-picker'

import { currentHour, currentMinutes } from '@/utils/format'

import TimeDrumRoll from '@/components/modules/TimeDrumRoll'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'

import { saveWater } from '@/app/(action)/water'

const FREE = 'free'

const options = [
  { value: '50', label: '50 ml', hint: '試飲サイズ' },
  { value: '150', label: '150 ml', hint: '小さめの紙コップ' },
  { value: '250', label: '250 ml', hint: '一般的な紙コップ' },
  { value: '350', label: '350 ml', hint: 'テイクアウトカップ' },
  { value: '500', label: '500 ml', hint: '' },
  { value: '1000', label: '1000 ml', hint: '' },
  { value: FREE, label: '自由入力', hint: '' },
]

type WaterFormSheetProps = {
  date: string
  children: React.ReactNode
}

export const WaterFormSheet: React.FC<WaterFormSheetProps> = ({ date, children }) => {
  const [volume, setVolume] = useState<string>('250')
  const [inputValue, setInputValue] = useState<string>('')
  const router = useRouter()
  const { toast } = useToast()
  const [pickerValue, setPickerValue] = useState<PickerValue>({
    hour: currentHour,
    minute: currentMinutes,
  })

  const handleSave = useCallback(async () => {
    const postValue = volume === FREE ? Number(inputValue) : Number(volume)
    const drank_at = `${date} ${pickerValue.hour}:${pickerValue.minute}`
    const res = await saveWater({ volume: postValue, drank_at })
    if (res.ID > 0) {
      toast({ title: '保存しました' })
      router.refresh()
    }
  }, [date, volume, router, pickerValue, toast, inputValue])

  const handleChangeRadio = (value: string) => {
    setVolume(value)
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (Number.isInteger(Number(value)) && 10000 > Number(value)) {
      setInputValue(value)
    } else {
      setInputValue('')
    }
  }

  const handlePickerChange = useCallback(
    (newValue: PickerValue, key: string) => {
      setPickerValue({ ...pickerValue, [key]: newValue[key] })
    },
    [pickerValue],
  )

  return (
    <Sheet>
      {children}
      <SheetContent side='bottom'>
        {volume !== FREE && (
          <p className='text-primary text-center text-2xl mb-4'>{volume}ml</p>
        )}
        <RadioGroup
          className='flex flex-wrap gap-2 justify-center'
          value={volume}
          onValueChange={(value) => handleChangeRadio(value)}
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
        {volume === FREE && (
          <div className='mt-4'>
            <p className='text-center'>自由入力</p>
            <div className='flex items-center justify-center mt-2 gap-2'>
              <Input
                className='w-32 ml-6'
                value={inputValue}
                onBlur={handleBlur}
                onChange={handleChangeInput}
              />
              <p>ml</p>
            </div>
          </div>
        )}
        <TimeDrumRoll pickerValue={pickerValue} onPickerChange={handlePickerChange}>
          <p className='text-center my-4 text-sm'>{date}</p>
          <DialogTrigger className='flex items-center gap-2 m-auto mb-8 text-gray-700 border border-input p-3 rounded-lg'>
            <IoTime size='18px' />
            <p className='text-xl'>
              {pickerValue.hour}:{pickerValue.minute}
            </p>
          </DialogTrigger>
        </TimeDrumRoll>
        <div className='flex justify-center  gap-8'>
          <SheetClose>
            <Button variant='secondary'>キャンセル</Button>
          </SheetClose>
          <SheetClose>
            <Button className='w-36' onClick={handleSave}>
              記録する
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
