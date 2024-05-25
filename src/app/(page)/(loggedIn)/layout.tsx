import { FaHome } from 'react-icons/fa'
import { IoIosWater, IoMdSettings } from 'react-icons/io'

import { Card, CardContent } from '@/components/ui/card'

import type { Metadata } from 'next'

import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'ホーム',
}

const footerLinkStyle =
  'hover:underline flex flex-col items-center transform transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='bg-sky-50/50 m-auto max-w-4xl'>
        <header className='bg-blue-600 text-white text-center p-2 text-lg'>ホーム</header>
        <main className='mt-16'>{children}</main>
        <footer className='fixed bottom-0 max-w-4xl w-full'>
          <Card className='bg-slate-100 max-w-4xl border-slate-300 border-t-2 rounded-none m-auto'>
            <CardContent className='py-2 text-center text-slate-500'>
              <div className='flex justify-around space-x-4'>
                <a className={footerLinkStyle} href='#'>
                  <FaHome className='mb-1' />
                  <p>ホーム</p>
                </a>
                <a className={footerLinkStyle}>
                  <IoIosWater className='mb-1' />
                  水分管理
                </a>
                <a className={footerLinkStyle} href='#'>
                  <IoMdSettings className='mb-1' />
                  設定
                </a>
              </div>
            </CardContent>
          </Card>
        </footer>
      </body>
    </html>
  )
}
