import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import LoginForm from '@/page/auth/components/LoginForm'

export default function LoginPage() {
  return (
    <Card className='w-[350px] m-auto mt-20'>
      <CardHeader className='mb-4'>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}
