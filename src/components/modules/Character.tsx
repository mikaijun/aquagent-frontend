import Image from 'next/image'
import React from 'react'

import { getCharacterMessage } from '@/constants/messages'

type CharacterProps = {
  className?: string
}

const Character: React.FC<CharacterProps> = ({ className }) => {
  const message = getCharacterMessage()
  return (
    <div className={className}>
      <div className='flex items-start'>
        <Image
          alt='logo'
          className='mt-32'
          height={120}
          src='/character/wink.png'
          width={120}
        />
        <div className='base balloon ml-[-60px]'>{message}</div>
      </div>
    </div>
  )
}

export default Character
