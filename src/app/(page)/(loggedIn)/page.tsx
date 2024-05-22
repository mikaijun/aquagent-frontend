import { Metadata } from 'next'

import { UserResponse, fetchUser } from '@/action/user'
import { LogoutButton } from '@/page/home/components/LogoutButton'
import WaterForm from '@/pagewater/WaterForm'

export const metadata: Metadata = {
  title: 'ホーム',
}

export default async function Home() {
  const res = await fetchUser()
  const user = (await res.json()) as UserResponse

  return (
    <div>
      <h3>ユーザー名</h3>
      <p>{user.username}</p>
      <h3>メールアドレス</h3>
      <p>{user.email}</p>
      <LogoutButton />
      <WaterForm />
    </div>
  )
}
