import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { generateCookies } from "@/api/_util/cookie";

const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`;

export async function POST() {
  try {
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
    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json({ status: 500 });
  }
}
