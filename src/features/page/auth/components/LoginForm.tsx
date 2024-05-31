'use client'

import { SubmissionResult, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useFormState } from 'react-dom'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

import { login } from '@/action/auth'
import { PagePath } from '@/constants/urls'
import { loginSchema } from '@/constants/zods'

const initialState: SubmissionResult<string[]> = {
  fields: ['email', 'password'],
  initialValue: {
    email: '',
    password: '',
  },
}

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('signup') ?? ''
  const { toast } = useToast()
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

  useEffect(() => {
    if (query) {
      toast({ title: '作成しました' })
      router.push(PagePath.auth.login)
    }
  }, [query, router, toast])

  return (
    <>
      <div className='flex justify-center mb-8'>
        <Button onClick={handleTestLogin}>お試しで使ってみる</Button>
      </div>
      <Accordion collapsible type='single'>
        <AccordionItem className='border-y-0' value='item-1'>
          <AccordionTrigger className='text-sm'>
            マイアカウントでログイン
          </AccordionTrigger>
          <AccordionContent>
            <form
              noValidate
              action={action}
              className='p-4'
              id={form.id}
              onSubmit={form.onSubmit}
            >
              {error && (
                <div className='mb-2 text-red-500'>{Object.values(error)[0]}</div>
              )}
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
                <Input
                  id={fields.password.id}
                  name={fields.password.name}
                  type='password'
                />
                <div className='mt-1 text-red-500'>{fields.password.errors}</div>
              </div>
              <div className='flex justify-center'>
                <Button className='w-40'>ログイン</Button>
              </div>
            </form>
            <div className='flex justify-center'>
              <Link className='text-primary mt-4' href={PagePath.auth.signup}>
                新しいアカウントを作成
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default LoginForm
