import React from 'react'
import { VscFile } from 'react-icons/vsc'

export default function NoStudent() {
  return (
    <div className='h-full w-full grid place-items-center text-zinc-700'>
      
      <div className='w-full md:w-[400px] rounded border-dashed border-2 border-zinc-500 p-4 flex flex-col gap-4 items-center'>
        <VscFile fontSize='4em'/>
        <h2>No student in this class.</h2>
        <button 
        onClick={() => setView('add class')}
        className='bg-blue-800 rounded focus:outline-none py-2 px-4 text-white shadow-lg w-full'>Add student</button>
      </div>

    </div>
  )
}

