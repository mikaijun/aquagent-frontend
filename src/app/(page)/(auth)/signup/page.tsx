import { Metadata } from 'next'
import Image from 'next/image'

import SignupFormPage from '@/components/modules/SignupFormPage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: '新規作成',
}

export default function SignupPage() {
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
          <CardTitle>新規作成</CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          <SignupFormPage />
        </CardContent>
      </Card>
    </div>
  )
}
