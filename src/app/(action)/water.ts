"use server";

import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";

import { formatCookiesForHeader } from "@/utils/cookies";

import { endPoint } from "@/constants/urls";
import { waterSchema } from "@/constants/zods";

export async function createWater(
  _: unknown,
  formData: FormData,
): Promise<SubmissionResult<string[]>> {
  const submission = parseWithZod(formData, {
    schema: waterSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const cookiesStore = cookies();
  const response = await fetch(endPoint.loggedIn.waters, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: formatCookiesForHeader(cookiesStore),
    },
    credentials: "include",
    body: JSON.stringify({
      volume: Number(submission.value.water),
    }),
  });
  if (response.status === 200) {
    return { status: "success" };
  } else {
    return { status: "error", error: { message: ["登録に失敗しました"] } };
  }
}
