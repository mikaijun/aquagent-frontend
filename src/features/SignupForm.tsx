'use client'

import { SubmissionResult, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { signup } from '@/action/auth'
import { signupSchema } from '@/constants/zods'

const initialState: SubmissionResult<string[]> = {
  fields: ['username', 'email', 'password'],
  initialValue: {
    username: '',
    email: '',
    password: '',
  },
}

const SignupForm = () => {
  const [lastResult, action] = useFormState(signup, initialState)
  const { error } = lastResult
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signupSchema })
    },
    shouldValidate: 'onSubmit',
  })

  return (
    <form
      noValidate
      action={action}
      className='p-4'
      id={form.id}
      onSubmit={form.onSubmit}
    >
      {error && <div className='mb-2 text-red-500'>{Object.values(error)[0]}</div>}
      <div className='mb-4'>
        <Label className='block mb-2' htmlFor={fields.username.id}>
          お名前
        </Label>
        <Input id={fields.username.id} name={fields.username.name} type='name' />
        <div className='mt-1 text-red-500'>{fields.username.errors}</div>
      </div>
      <div className='mb-4'>
        <Label className='block mb-2' htmlFor={fields.email.id}>
          メールアドレス
        </Label>
        <Input id={fields.email.id} name={fields.email.name} type='email' />
        <div className='mt-1 text-red-500'>{fields.email.errors}</div>
      </div>
      <div className='mb-4'>
        <Label className='block mb-2' htmlFor={fields.password.id}>
          パスワード
        </Label>
        <Input id={fields.password.id} name={fields.password.name} type='password' />
        <div className='mt-1 text-red-500'>{fields.password.errors}</div>
      </div>
      <div className='flex justify-center'>
        <Button className='w-40'>新規作成</Button>
      </div>
    </form>
  )
}

export default SignupForm
