import { FaHome } from 'react-icons/fa'
import { IoIosWater, IoMdSettings } from 'react-icons/io'

import { Card, CardContent } from '@/components/ui/card'

import type { Metadata } from 'next'

import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'ホーム',
}

const footerLinkStyle =
  'hover:underline flex flex-col items-center transform transition-transform duration-300 ease-in-out hover:scale-110 active:scale-90 text-gray-600'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className='bg-gradient-to-b from-blue-50 to-sky-100 m-auto max-w-4xl font-sans h-screen'>
        <header className='bg-blue-500 text-white text-center p-4 text-xl shadow-md'>
          <h1 className='font-semibold'>ホーム</h1>
        </header>
        <main className='mt-16 px-4'>{children}</main>
        <footer className='fixed bottom-0 max-w-4xl w-full'>
          <Card className='bg-gray-100 border-t-2 border-gray-200 rounded-none m-auto shadow-md'>
            <CardContent className='py-3 text-center text-gray-300'>
              <div className='flex justify-around space-x-6'>
                <a className={footerLinkStyle} href='#'>
                  <FaHome className='mb-1 text-2xl' />
                  <p className='text-xs'>ホーム</p>
                </a>
                <a className={footerLinkStyle} href='#'>
                  <IoIosWater className='mb-1 text-2xl' />
                  <p className='text-xs'>水分管理</p>
                </a>
                <a className={footerLinkStyle} href='#'>
                  <IoMdSettings className='mb-1 text-2xl' />
                  <p className='text-xs'>設定</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </footer>
      </body>
    </html>
  )
}
