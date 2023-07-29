import React, { useContext, useEffect } from 'react'
import ClassList from '../components/ClassList'
import Board from '../components/Board'
import { Context } from '../datasource/Provider'

export default function Home() {

  const { classes , setView } = useContext(Context)

  useEffect(() => {
    if(!classes.length) setView('no class')
  }, [])
  
  return (
    <div className='h-full w-full flex flex-col items-center gap-4'>
      <ClassList />
      <Board />
    </div>
  )
}
