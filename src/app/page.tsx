"use client";

import { useCallback } from "react";

import { UserResponse } from "@/api/users/route";

const loginUrl = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/login`;
const userUrl = `${process.env.NEXT_PUBLIC_ENDPOINT}/api/users`;

export default function Home() {
  const handleLogin = useCallback(async () => {
    try {
      const res = await fetch(loginUrl, {
        method: "POST",
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleFetchUser = useCallback(async () => {
    try {
      const res = await fetch(userUrl);
      const data = (await res.json()) as UserResponse;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <>
      <button onClick={handleLogin}>ログイン</button>
      <button onClick={handleFetchUser}>ユーザー取得</button>
    </>
  );
}
