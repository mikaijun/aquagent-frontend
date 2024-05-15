import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { generateHeaderCookies } from "../_util/cookie";

const url = "http://localhost:8000/v1/users";

export async function GET() {
  const cookiesStore = cookies();
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Cookie: generateHeaderCookies(cookiesStore),
      },
      credentials: "include",
    });
    const data = await response.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: 500 });
  }
}
