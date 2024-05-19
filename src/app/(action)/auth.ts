"use server";

import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  JWT,
  USER_ID,
  formatCookiesForHeader,
  parseCookiesFromHeaders,
} from "@/utils/cookies";

import { PagePath, endPoint } from "@/constants/urls";
import { loginSchema } from "@/constants/zods";

export async function login(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const response = await fetch(endPoint.auth.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(submission.value),
  });
  if (response.status === 200) {
    const { jwt, userId } = parseCookiesFromHeaders(response.headers);
    cookies().set(JWT, jwt);
    cookies().set(USER_ID, userId);
    redirect("/");
  } else {
    return submission.reply({
      formErrors: ["メールアドレスかパスワードが誤ってます"],
    });
  }
}

export async function logout() {
  const cookiesStore = cookies();
  await fetch(endPoint.loggedIn.logout, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: formatCookiesForHeader(cookiesStore),
    },
    credentials: "include",
  });

  cookies().delete(JWT);
  cookies().delete(USER_ID);
  redirect(PagePath.login);
}
