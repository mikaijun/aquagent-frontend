import { headers } from 'next/headers'
import { FaHome } from 'react-icons/fa'
import { IoIosWater } from 'react-icons/io'

import { Card, CardContent } from '@/components/ui/card'
import { Toaster } from '@/components/ui/toaster'

import { PagePath } from '@/constants/urls'
import { SettingSheet } from '@/features/SettingSheet'
import { cn } from '@/lib/utils'

import type { Metadata } from 'next'

import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'ホーム',
}

const footerLinkStyle =
  'flex flex-col items-center transform transition-transform duration-300 ease-in-out active:scale-90'

const textColor = (currentPath: string, targetPath: string) => {
  return currentPath === targetPath ? 'text-blue-400' : 'text-gray-500'
}

const headerTitle = (currentPath: string) => {
  switch (currentPath) {
    case PagePath.loggedIn.home:
      return 'ホーム'
    case PagePath.loggedIn.list:
      return '水分管理'
    default:
      return 'ホーム'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = headers()
  const pathName = headersList.get('path-name') || ''
  return (
    <div className='bg-gradient-to-b from-blue-50 to-sky-100'>
      <Toaster />
      <div className='m-auto max-w-4xl font-sans h-screen'>
        <header className='bg-blue-400 text-white text-center p-4 text-xl shadow-md'>
          <h1 className='font-cursive'>{headerTitle(pathName)}</h1>
        </header>
        <main>{children}</main>
        <footer className='fixed bottom-0 max-w-4xl w-full'>
          <Card className='bg-gray-100 border-t-2 border-gray-200 rounded-none m-auto shadow-md'>
            <CardContent className='py-3 text-center text-gray-300'>
              <div className='flex justify-around space-x-6'>
                <a
                  className={cn(
                    footerLinkStyle,
                    textColor(pathName, PagePath.loggedIn.home),
                  )}
                  href={PagePath.loggedIn.home}
                >
                  <FaHome className='mb-1 text-2xl' />
                  <p className='text-xs'>ホーム</p>
                </a>
                <a
                  className={cn(
                    footerLinkStyle,
                    textColor(pathName, PagePath.loggedIn.list),
                  )}
                  href={PagePath.loggedIn.list}
                >
                  <IoIosWater className='mb-1 text-2xl' />
                  <p className='text-xs'>水分管理</p>
                </a>
                <SettingSheet />
              </div>
            </CardContent>
          </Card>
        </footer>
      </div>
    </div>
  )
}
