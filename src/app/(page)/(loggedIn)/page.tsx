import { UserResponse, fetchUser } from "@/action/user";

import { LogoutButton } from "@/page/home/components/LogoutButton";

export default async function Home() {
  const res = await fetchUser();
  const user = (await res.json()) as UserResponse;

  return (
    <>
      <h3>ユーザー名</h3>
      <p>{user.username}</p>
      <h3>メールアドレス</h3>
      <p>{user.email}</p>
      <LogoutButton />
    </>
  );
}
