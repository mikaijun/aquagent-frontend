import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "invalid_type_error",
      required_error: "required_error",
    })
    .email(),
  password: z.string(),
});

export const waterSchema = z.object({
  id: z.number().nullish(),
  volume: z.string(),
});
