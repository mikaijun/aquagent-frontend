import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'メールアドレスを入力してください',
      required_error: 'メールアドレスを入力してください',
    })
    .email('メールアドレスの形式が正しくありません'),
  password: z.string({
    invalid_type_error: 'パスワードを入力してください',
    required_error: 'パスワードを入力してください',
  }),
})

export const waterSchema = z.object({
  id: z.number().nullish(),
  volume: z.string(),
})
