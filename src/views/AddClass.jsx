import React, { useContext, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { VscSearch } from 'react-icons/vsc'
import { Context } from '../datasource/Provider'
import GraderAPI from '../datasource/GraderAPI'

export default function AddClass() {

  const { addClass , setView } = useContext(Context)

  const [ text , setText ] = useState('')

  const [ selected , setSelected ] = useState([])

  const [ allSubjects , setAllSubjects ] = useState(GraderAPI.GET_DEFAULT_SUBJECTS())

  const [ filterList , setFilterList ] = useState(GraderAPI.GET_DEFAULT_SUBJECTS())

  const [ searchText , setSearchText ] = useState('')

  function toggleSelected(subject){
      if(selected.includes(subject)){
          setSelected(p => [...p.filter(s => s !== subject)])
      }else{
        setSelected([...selected , subject])
      }
  }

  useEffect(() => {

    !searchText.trim() ? setFilterList(GraderAPI.GET_DEFAULT_SUBJECTS()) : setFilterList(GraderAPI.GET_DEFAULT_SUBJECTS().filter(t => t.toLowerCase().includes(searchText.toLowerCase())))

  } , [searchText])

  return (
    <motion.div 
    initial={{ translateX: '-50px' , opacity: 0 }} 
    animate={{ translateX: 0 , opacity: 1 }}
    className='h-full w-full flex items-center justify-center flex-col p-2 gap-2 text-xs'>

      <div className='bg-white rounded flex flex-col gap-4 p-2 w-full shadow-lg border border-zinc-500'>
        <input
        autoFocus
        placeholder='Name, e.g ; JSS3' 
        value={text}
        onChange={({ target }) => setText(target.value.toUpperCase())}
        className='rounded focus:outline-none focus:border-blue-800 border-zinc-500 border-2 p-2 w-full'
        />


      </div>

      <div className='bg-white rounded flex flex-col gap-4 p-2 w-full h-[500px] shadow-lg border border-zinc-500'>
      
        <div className='border border-solid border-zinc-500 py-2 px-4 shadow-lg w-full flex items-center'>
            <input
            value={searchText}
            placeholder='Find subject'
            className='focus:outline-none flex-1'
            onChange={({ target }) => setSearchText(target.value)}
            />
            <VscSearch />
        </div>

        <div className='flex-1 grid grid-cols-3 gap-4 p-4 overflow-scroll text-xs'>
          {filterList.map(subject => (
            <p 
            key={subject}
            onClick={() => toggleSelected(subject)}
            className={`p-1 rounded hover:bg-zinc-300 ${selected.includes(subject) ? 'bg-blue-500 text-white' : ''}`}>{subject}</p>
          ))}
        </div>
      </div>
      
      <div className='bg-white rounded flex items-center justify-between gap-4 p-4 w-full shadow-lg border border-zinc-500'>
          <p>{selected.length} selected</p>

            <button
            onClick={() => setView('home')}
            className='bg-blue-800 rounded focus:outline-none py-2 px-4 text-white shadow-lg'
            >CANCEL</button>

            <button
            onClick={() => {
              addClass(text.toUpperCase() , selected);
              setView('home')
            }}
            disabled={text.trim().length < 3 || selected.length < 1}
            className='bg-blue-800 rounded focus:outline-none py-2 px-4 text-white shadow-lg disabled:bg-zinc-500'
            >DONE</button>
      </div>

    </motion.div>
  )
}
