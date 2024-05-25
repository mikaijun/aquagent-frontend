import { Metadata } from 'next'

import WaterForm from '@/page/water/WaterForm'

export const metadata: Metadata = {
  title: 'ホーム',
}

export default function Home() {
  // const res = await fetchUser()
  // const user = (await res.json()) as UserResponse

  return (
    <div>
      {/* <h3>ユーザー名</h3>
      <p>{user.username}</p>
      <h3>メールアドレス</h3>
      <p>{user.email}</p> */}
      {/* <LogoutButton /> */}
      <WaterForm />
    </div>
  )
}
