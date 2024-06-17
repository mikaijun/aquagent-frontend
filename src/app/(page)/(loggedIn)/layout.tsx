import Layout from '@/components/modules/Layout'
import { Toaster } from '@/components/ui/toaster'

import type { Metadata } from 'next'

import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'ホーム',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='bg-gradient-to-b from-blue-50 to-sky-100'>
      <Toaster />
      <Layout>{children}</Layout>
    </div>
  )
}
