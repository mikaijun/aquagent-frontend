'use client'

import { SubmissionResult, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import { Button } from '@/components/ui/button'

import { WaterResponse, createWater } from '@/action/water'
import { waterSchema } from '@/constants/zods'

type WaterFormProps = {
  water?: WaterResponse
  onSave?: () => void
}

const wrapperStyle = 'flex justify-center items-center w-28 h-14'
const labelStyle =
  'text-center border-2 rounded-2xl  p-2 my-4 text-3xl peer-checked:bg-sky-500'

const WaterForm: React.FC<WaterFormProps> = ({ water, onSave }) => {
  const router = useRouter()
  const initialState: SubmissionResult<string[]> = {
    initialValue: {
      id: water?.ID.toString() || '',
      volume: water?.Volume.toString() || '',
    },
  }
  const [lastResult, action] = useFormState(createWater, initialState)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: waterSchema })
    },
    shouldValidate: 'onSubmit',
  })

  useEffect(() => {
    if (lastResult.status === 'success') {
      alert(water ? '更新しました' : '登録しました')
      if (onSave) {
        onSave()
        router.refresh()
      }
    }
  }, [lastResult, water, onSave, router])

  console.log(form.value?.volume)

  return (
    <form noValidate action={action} id={form.id} onSubmit={form.onSubmit}>
      <div className='flex flex-wrap'>
        <div className={wrapperStyle}>
          <input
            className='hidden peer'
            id='100'
            name={fields.volume.name}
            type='radio'
            value='100'
          />
          <label className={labelStyle} htmlFor='100'>
            100ml
          </label>
        </div>
        <div className={wrapperStyle}>
          <input
            className='hidden peer'
            id='200'
            name={fields.volume.name}
            type='radio'
            value='200'
          />
          <label className={labelStyle} htmlFor='200'>
            200ml
          </label>
        </div>
        <div className={wrapperStyle}>
          <input
            className='hidden peer'
            id='500'
            name={fields.volume.name}
            type='radio'
            value='500'
          />
          <label className={labelStyle} htmlFor='500'>
            500ml
          </label>
        </div>
        <div className={wrapperStyle}>
          <input
            className='hidden peer'
            id='1000'
            name={fields.volume.name}
            type='radio'
            value='1000'
          />
          <label className={labelStyle} htmlFor='1000'>
            1,000ml
          </label>
        </div>
      </div>
      <Button>{water ? '更新' : '作成'}</Button>
    </form>
  )
}

export default WaterForm
