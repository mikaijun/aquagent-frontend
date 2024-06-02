import { Metadata } from 'next'
import Image from 'next/image'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import LoginFormPage from '@/features/LoginFormPage'

export const metadata: Metadata = {
  title: 'ログイン',
}

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { signup: string }
}) {
  return (
    <div className='py-20 px-4'>
      <Image
        alt='logo'
        className='m-auto mb-8'
        height={200}
        src='/logo.png'
        width={300}
      />
      <Card className='max-w-md m-auto'>
        <CardHeader className='mb-4 p-4'>
          <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          <LoginFormPage query={searchParams?.signup ?? ''} />
        </CardContent>
      </Card>
    </div>
  )
}
