'use client'

import { SubmissionResult, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

import { WaterResponse, createWater } from '@/action/water'
import { waterSchema } from '@/constants/zods'

type WaterFormProps = {
  water?: WaterResponse
  onSave?: () => void
}

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

  return (
    <form noValidate action={action} id={form.id} onSubmit={form.onSubmit}>
      <div>
        <input name={fields.volume.name} type='radio' value='100' />
        <label htmlFor={fields.volume.id}>100</label>
        <div>{fields.volume.errors}</div>
        <div>{fields.id.errors}</div>
      </div>
      <div>
        <input name={fields.volume.name} type='radio' value='200' />
        <label htmlFor={fields.volume.id}>200</label>
      </div>
      <div>
        <input name={fields.volume.name} type='radio' value='300' />
        <label htmlFor={fields.volume.id}>300</label>
      </div>
      <button>{water ? '更新' : '作成'}</button>
    </form>
  )
}

export default WaterForm
