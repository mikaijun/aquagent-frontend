'use client'

import { SubmissionResult, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useCallback } from 'react'
import { useFormState } from 'react-dom'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { login } from '@/action/auth'
import { loginSchema } from '@/constants/zods'

const initialState: SubmissionResult<string[]> = {
  fields: ['email', 'password'],
  initialValue: {
    email: '',
    password: '',
  },
}

const LoginForm = () => {
  const [lastResult, action] = useFormState(login, initialState)
  const { error } = lastResult
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema })
    },
    shouldValidate: 'onSubmit',
  })

  const handleTestLogin = useCallback(async () => {
    const formData = new FormData()
    formData.append('email', 'test@co.jp')
    formData.append('password', 'password')
    await login({}, formData)
  }, [])

  return (
    <Card className='w-[350px] m-auto mt-20'>
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex justify-center'>
          <Button onClick={handleTestLogin}>お試しで使ってみる</Button>
        </div>
        <Accordion collapsible type='single'>
          <AccordionItem className='border-y-0' value='item-1'>
            <AccordionTrigger className='text-sm'>
              マイアカウントでログイン
            </AccordionTrigger>
            <AccordionContent>
              <form noValidate action={action} id={form.id} onSubmit={form.onSubmit}>
                {error && <div>{Object.values(error)[0]}</div>}
                <div>
                  <label
                    className='text-3xl font-bold underline'
                    htmlFor={fields.email.id}
                  >
                    Email
                  </label>
                  <input name={fields.email.name} type='email' />
                  <div>{fields.email.errors}</div>
                </div>
                <div>
                  <label htmlFor={fields.password.id}>Password</label>
                  <input name={fields.password.name} type='password' />
                  <div>{fields.password.errors}</div>
                </div>
                <Button>ログイン</Button>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default LoginForm
