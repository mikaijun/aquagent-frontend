import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { generateCookies } from "../_util/cookie";

export type CreateAccountResponse = {
  url: string;
  message?: string;
};

export async function POST() {
  const url = "http://localhost:8000/login";
  const data = {
    email: "test@co.jp",
    password: "password",
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const { jwt, userId } = generateCookies(response.headers);
  cookies().set("jwt", jwt);
  cookies().set("userId", userId);
  return NextResponse.json({ data }, { status: 200 });
}
