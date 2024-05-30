'use client'

import { useEffect } from 'react'

import { cron } from '@/app/(action)/auth'

// NOTE: Render.comのスリープ対策のため、定期的にアクセスするページ
export default function CronPage() {
  useEffect(() => {
    void cron()
  }, [])
  return <div />
}
