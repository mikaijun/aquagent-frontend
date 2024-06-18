'use client'

import React from 'react'
import { GoPlus } from 'react-icons/go'

import { WaterFormSheet } from '@/components/containers/WaterFormSheet'
import { SheetTrigger } from '@/components/ui/sheet'

type WaterAddButtonProps = {
  date: string
}

const WaterAddButton: React.FC<WaterAddButtonProps> = ({ date }) => {
  return (
    <WaterFormSheet date={date}>
      <SheetTrigger className='block mx-auto mb-12'>
        <GoPlus className='shadow-2xl w-[52px] h-[52px] bg-primary text-white rounded-full fixed right-4 bottom-20 md:fixed-center-right' />
      </SheetTrigger>
    </WaterFormSheet>
  )
}

export default WaterAddButton
