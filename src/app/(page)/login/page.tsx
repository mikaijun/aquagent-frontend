"use client";

import { SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

import { login } from "@/action/login";
import { loginSchema } from "@/schema/auth";

const LoginForm = () => {
  const initialState: SubmissionResult<string[]> = {
    status: "success",
    fields: ["email", "password"],
    initialValue: {
      email: "",
      password: "",
    },
  };
  const [lastResult, action] = useFormState(login, initialState);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur",
  });
  console.log(lastResult);

  return (
    <form noValidate action={action} id={form.id} onSubmit={form.onSubmit}>
      <div>
        <label htmlFor={fields.email.id}>Email</label>
        <input name={fields.email.name} type="email" />
        <div>{fields.email.errors}</div>
      </div>
      <div>
        <label htmlFor={fields.password.id}>Password</label>
        <input name={fields.password.name} type="password" />
        <div>{fields.password.errors}</div>
      </div>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
