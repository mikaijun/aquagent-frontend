"use client";

const loginUrl = "http://localhost:3000/api/login";
const userUrl = "http://localhost:3000/api/users";

const login = async () => {
  try {
    const res = await fetch(loginUrl, {
      method: "POST",
    });
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
};

const user = async () => {
  try {
    const res = await fetch(userUrl);
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
};

export default function Home() {
  return (
    <>
      <button onClick={login}>ログイン</button>
      <button onClick={user}>ユーザー取得</button>
    </>
  );
}
