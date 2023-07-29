import React from 'react'

export default function AppView({ children }) {
  return (
    <div className='flex-1 w-full bg-zinc-200'>
        {children}
    </div>
  )
}
