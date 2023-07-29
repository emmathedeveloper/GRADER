import React, { useState } from 'react'

export default function AffectiveReport({ virtues }) {

  const [ vts ] = useState(virtues)

  return (
    <div className='flex-1 flex border border-blue-700'>
        <div className='flex-1'>
            {vts.map((v , i) => (
            <small key={i} className='block pl-2 border-b border-solid border-blue-700 h-[20px] last-of-type:border-none'>{v}</small>
            ))}
        </div>
        <div className='flex-1 border-l border-blue-700'>
            <div className='w-full grid grid-cols-5 border-b border-blue-700 h-[20px]'>
                <small className="text-center border-r border-solid border-blue-700">5</small>
                <small className="text-center border-r border-solid border-blue-700">4</small>
                <small className="text-center border-r border-solid border-blue-700">3</small>
                <small className="text-center border-r border-solid border-blue-700">2</small>
                <small className="text-center">1</small>
            </div>
            <div className='w-full grid grid-cols-5 border-b border-blue-700 h-[20px]'>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center"></small>
            </div>
            <div className='w-full grid grid-cols-5 border-b border-blue-700 h-[20px]'>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center"></small>
            </div>
            <div className='w-full grid grid-cols-5 border-b border-blue-700 h-[20px]'>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center"></small>
            </div>
            <div className='w-full grid grid-cols-5 h-[20px]'>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center border-r border-solid border-blue-700"></small>
                <small className="text-center"></small>
            </div>
        </div>
    </div>
  )
}
