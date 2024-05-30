import { Metadata } from 'next'

import { endPoint } from '@/constants/urls'

export const metadata: Metadata = {
  title: 'みずとも',
}

// NOTE: Render.comのスリープ対策のため、定期的にアクセスするページ
export default async function CronPage() {
  await fetch(endPoint.auth.cron, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return <div />
}
