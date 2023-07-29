import React, { useContext, useEffect } from 'react'
import { Context } from '../datasource/Provider'
import GraderAPI from '../datasource/GraderAPI'

export default function BroadSheet() {

  const { currentClass , currentStudents , table , setView } = useContext(Context)

  function handlePress(e){
    if(e.key == 'b' && e.ctrlKey) setView('home')
  }

  useEffect(() => {
     window.addEventListener('keydown' , handlePress)

     return () => window.removeEventListener('keydown' , handlePress)
  } , [])

  return (
    <div className='w-full h-full flex-1 bg-white rounded shadow-lg p-2'>


        <div className='border border-zinc-500 h-full w-full text-xs flex'>
          
          <div className='h-full border-r border-zinc-500 w-max pt-2 flex flex-col'>
            <small className='block pb-1'>S/N</small>

            <div className='border-t border-zinc-500 w-full flex flex-1 flex-col gap-1 px-1'>
              <small className='block opacity-0'>NAMES</small>
              {currentStudents.map((s , i) => <small key={i} className='block'>{ i + 1 }</small>)}
            </div>

          </div>
          
          <div className='h-full border-r border-zinc-500 w-max pt-2 flex flex-col'>
            <small className='block pb-1'>NAMES</small>

            <div className='border-t border-zinc-500 w-full flex flex-1 flex-col gap-1 px-1'>
              <small className='block opacity-0'>NAMES</small>
              {currentStudents.map((s , i) => <small key={i} className='block'>{ s.name }</small>)}
            </div>

          </div>

          <div className='h-full border-r border-zinc-500 w-max pt-2 flex-1 flex flex-col'>
            <small className='block pb-1'>SUBJECTS</small>


          <div className='h-full w-full flex border-t border-zinc-500'>

            {currentClass.subjects?.map((subject , i , arr) => (
              <div key={subject} className={`w-max ${i == arr.length - 1 ? '' : 'border-r'} border-zinc-500 flex gap-2 px-1 flex-1`}>
                <div className='w-max h-full flex items-center flex-col gap-1 flex-1'>
                  <small className=''>{subject.substring(0 , 3)}</small>
                  {table[subject]?.map((s , i) => <small key={i}>{s}</small>)}
                </div>

                <div className='w-max h-full flex items-center flex-col gap-1 flex-1'>
                  <small>POS</small>
                  {GraderAPI.GET_SUBJECT_POSITIONS(table[subject])?.map((s , i) => <small key={i}>{s}</small>)}
                </div>
              </div>
            ))}
           
          </div>

          </div>

          <div className='h-full border-r border-zinc-500 w-max pt-2 flex flex-col'>
            <small className='block pb-1'>TOTAL</small>
            <div className='border-t border-zinc-500 w-full flex flex-1 items-center flex-col gap-1 px-1'>
              <small className='block opacity-0'>TOTAL</small>
              {GraderAPI.GET_STUDENT_TOTAL(currentStudents)?.map((s , i) => <small key={i}>{s}</small>)}
            </div>
          </div>

          <div className='h-full border-r border-zinc-500 w-max pt-2 flex flex-col'>
            <small className='block pb-1'>AVERAGE</small>
            <div className='border-t border-zinc-500 w-full flex flex-1 items-center flex-col gap-1 px-1'>
              <small className='block opacity-0'>AVERAGE</small>
              {GraderAPI.GET_STUDENT_AVERAGE(currentStudents)?.map((s , i) => <small key={i}>{s}%</small>)}
            </div>
          </div>

          <div className='h-full border-zinc-500 w-max pt-2 flex flex-col'>
            <small className='block pb-1'>POS</small>
            <div className='border-t border-zinc-500 w-full flex flex-1 items-center flex-col gap-1 px-1'>
              <small className='block opacity-0'>POS</small>
              {GraderAPI.GET_CLASS_POSITION(currentStudents)?.map((s , i) => <small key={i}>{s}</small>)}
            </div>
          </div>

        </div>

    </div>
  )
}
