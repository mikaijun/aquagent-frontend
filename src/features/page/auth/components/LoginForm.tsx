"use client";

import { SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

import { login } from "@/action/auth";
import { loginSchema } from "@/constants/zods";

const initialState: SubmissionResult<string[]> = {
  fields: ["email", "password"],
  initialValue: {
    email: "",
    password: "",
  },
};

const LoginForm = () => {
  const [lastResult, action] = useFormState(login, initialState);
  const { error } = lastResult;
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onSubmit",
  });

  return (
    <form noValidate action={action} id={form.id} onSubmit={form.onSubmit}>
      {error && <div>{Object.values(error)[0]}</div>}
      <div>
        <label
          className="text-3xl font-bold underline"
          htmlFor={fields.email.id}
        >
          Email
        </label>
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
