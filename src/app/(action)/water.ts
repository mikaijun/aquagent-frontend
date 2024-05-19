"use server";

import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { formatCookiesForHeader } from "@/utils/cookies";

import { endPoint } from "@/constants/urls";
import { waterSchema } from "@/constants/zods";

export type WaterResponse = {
  ID: number;
  UserID: number;
  Volume: number;
  CreatedAt: string;
  UpdatedAt: string;
};

export async function createWater(
  lastResult: SubmissionResult<string[]>,
  formData: FormData,
): Promise<SubmissionResult<string[]>> {
  const submission = parseWithZod(formData, {
    schema: waterSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const id = lastResult?.initialValue
    ? (lastResult?.initialValue.id as number)
    : null;

  const url = id ? endPoint.loggedIn.water(id) : endPoint.loggedIn.waters;
  const method = id ? "PUT" : "POST";

  const cookiesStore = cookies();
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: formatCookiesForHeader(cookiesStore),
    },
    credentials: "include",
    body: JSON.stringify({
      volume: Number(submission.value.volume),
    }),
  });
  if (response.status === 200) {
    return { status: "success" };
  } else {
    return { status: "error", error: { message: ["登録に失敗しました"] } };
  }
}

export async function fetchWaters(): Promise<NextResponse<WaterResponse[]>> {
  const cookiesStore = cookies();
  try {
    const response = await fetch(endPoint.loggedIn.waters, {
      headers: {
        "Content-Type": "application/json",
        Cookie: formatCookiesForHeader(cookiesStore),
      },
      credentials: "include",
    });
    const data = (await response.json()) as WaterResponse[];
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error(e);
    const data: WaterResponse[] = [];
    return NextResponse.json(data, { status: 500 });
  }
}
