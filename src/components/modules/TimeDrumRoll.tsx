'use client'

import { useCallback, useState } from 'react'
import Picker, { PickerValue } from 'react-mobile-picker'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const hourArray = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))

const minuteArray = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

const TimeDrumRoll = () => {
  const [pickerValue, setPickerValue] = useState<PickerValue>({
    hour: '00',
    minute: '00',
  })

  const handlePickerChange = useCallback(
    (newValue: PickerValue, key: string) => {
      setPickerValue({ ...pickerValue, [key]: newValue[key] })
    },
    [pickerValue],
  )

  return (
    <Dialog>
      <DialogTrigger>
        Click to set: {pickerValue.hour}:{pickerValue.minute}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>水分摂取時間</DialogTitle>
        <div className='mt-2'>
          <Picker value={pickerValue} wheelMode='natural' onChange={handlePickerChange}>
            <Picker.Column name='hour'>
              {hourArray.map((hour) => (
                <Picker.Item key={hour} value={hour}>
                  {({ selected }) => (
                    <div
                      className={
                        selected ? 'font-semibold text-neutral-900' : 'text-neutral-400'
                      }
                    >
                      {hour}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name='minute'>
              {minuteArray.map((minute) => (
                <Picker.Item key={minute} value={minute}>
                  {({ selected }) => (
                    <div
                      className={
                        selected ? 'font-semibold text-neutral-900' : 'text-neutral-400'
                      }
                    >
                      {minute}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
        <DialogClose asChild>
          <Button type='button'>決定</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default TimeDrumRoll
