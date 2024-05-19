"use client";

import { SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { createWater } from "@/action/water";
import { waterSchema } from "@/constants/zods";

const initialState: SubmissionResult<string[]> = {
  fields: ["water"],
  initialValue: {
    water: "100",
  },
};

const WaterForm = () => {
  const [lastResult, action] = useFormState(createWater, initialState);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: waterSchema });
    },
    shouldValidate: "onSubmit",
  });

  useEffect(() => {
    if (lastResult.status === "success") {
      alert("登録しました");
    }
  }, [lastResult]);

  return (
    <form noValidate action={action} id={form.id} onSubmit={form.onSubmit}>
      <div>
        <input name={fields.water.name} type="radio" value="100" />
        <label htmlFor={fields.water.id}>100</label>
      </div>
      <div>
        <input name={fields.water.name} type="radio" value="200" />
        <label htmlFor={fields.water.id}>200</label>
      </div>
      <div>
        <input name={fields.water.name} type="radio" value="300" />
        <label htmlFor={fields.water.id}>300</label>
      </div>
      <button>作成</button>
    </form>
  );
};

export default WaterForm;
