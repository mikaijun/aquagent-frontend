"use server";

import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parseCookiesFromHeaders } from "@/utils/cookies";

import { loginSchema } from "@/constants/zods";

const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`;

export async function login(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(submission.value),
  });
  if (response.status === 200) {
    const { jwt, userId } = parseCookiesFromHeaders(response.headers);
    cookies().set("jwt", jwt);
    cookies().set("userId", userId);
    redirect("/");
  } else {
    return submission.reply({
      formErrors: ["メールアドレスかパスワードが誤ってます"],
    });
  }
}
