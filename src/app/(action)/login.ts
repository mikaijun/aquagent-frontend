"use server";

import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { loginSchema } from "@/schema/auth";

// eslint-disable-next-line @typescript-eslint/require-await
export async function login(_: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const initialState: SubmissionResult<string[]> = {
    status: "success",
    fields: ["email", "password"],
  };

  return initialState;
}
