import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center h-auto w-auto '>
        <UserProfile />
    </div>
  )
}

export default page