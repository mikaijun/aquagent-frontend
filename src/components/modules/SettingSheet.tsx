'use client'

import { useCallback } from 'react'
import { IoMdSettings } from 'react-icons/io'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { logout } from '@/app/(action)/auth'

export const SettingSheet = () => {
  const handleLogout = useCallback(async () => {
    await logout()
  }, [])
  return (
    <Sheet>
      <SheetTrigger className='flex flex-col items-center text-gray-500'>
        <IoMdSettings className='mb-1 text-2xl' />
        <p className='text-xs'>設定</p>
      </SheetTrigger>
      <SheetContent side='bottom'>
        <SheetHeader>
          <SheetTitle className='text-center'>設定</SheetTitle>
          <SheetDescription className='m-auto'>
            <Button onClick={handleLogout}>ログアウト</Button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
