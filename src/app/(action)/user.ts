import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { formatCookiesForHeader } from "@/utils/cookies";

import { endPoint } from "@/constants/urls";

export type UserResponse = {
  id: number;
  username: string;
  email: string;
};

export async function fetchUser(): Promise<NextResponse<UserResponse>> {
  const cookiesStore = cookies();
  try {
    const response = await fetch(endPoint.user.fetch, {
      headers: {
        "Content-Type": "application/json",
        Cookie: formatCookiesForHeader(cookiesStore),
      },
      credentials: "include",
    });
    const data = (await response.json()) as UserResponse;
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error(e);
    const data: UserResponse = { id: 0, username: "", email: "" };
    return NextResponse.json(data, { status: 500 });
  }
}
