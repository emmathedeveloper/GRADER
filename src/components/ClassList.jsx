import React, { useContext , useState , useEffect } from 'react'
import { motion } from "framer-motion";
import { VscSearch, VscPersonAdd, VscNewFile, VscSortPrecedence } from 'react-icons/vsc'
import { Context } from '../datasource/Provider'

export default function ClassList() {

    const { currentClass , setCurrentClass , currentStudents , classes , setView , sortBy , setSortBy , deleteClass , deleteStudent , setStudentInEdit , setSelectedStudent } = useContext(Context)

    const [ dropDown , setDropDown ] = useState('')

    const [ classSearchText , setClassSearchText ] = useState('')

    const [ studentsSearchText , setStudentsSearchText ] = useState('')

    const [ classFilterList , setClassFilterList ] = useState([...classes])

    const [ studentsFilterList , setStudentsFilterList ] = useState([...currentStudents])

    const [ sortListOpen , setSortListOpen ] = useState(false)

    useEffect(() => {

        !classSearchText.trim() ? setClassFilterList(classes) : setClassFilterList(classes.filter(t => t.name.toLowerCase().includes(classSearchText.toLowerCase())))
    
      } , [classSearchText])

    useEffect(() => {

        !studentsSearchText.trim() ? setStudentsFilterList(currentStudents) : setStudentsFilterList(currentStudents.filter(t => t.name.toLowerCase().includes(studentsSearchText.toLowerCase())))
    
      } , [studentsSearchText])

  return (
    <div className='shadow-lg bg-white w-full rounded px-4 py-1 flex items-center justify-between gap-8'>

        <div className='flex items-center gap-2 bg-zinc-300 p-1 rounded relative'>
            <button
            onClick={() => dropDown === 'students' ? setDropDown('') : setDropDown('students')} 
            className='bg-white rounded px-4'>STUDENTS</button>
            {/* <button className='bg-white rounded px-4'>SUBJECTS</button> */}
            <button 
            onClick={() => dropDown === 'classes' ? setDropDown('') : setDropDown('classes')} 
            className='bg-white rounded px-4'>CLASSES</button>
            <button 
            onClick={() => setView('add student')}
            className='bg-white rounded px-4'>ADD STUDENT</button>
            <button 
            onClick={() => setView('add class')}
            className='bg-white rounded px-4'>ADD NEW CLASS</button>
            <button 
            onClick={() => setView('broad sheet')}
            className='bg-white rounded px-4'>PRINT BROADSHEET</button>

            {
            dropDown === 'students' && 

            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} 
            className='flex flex-col gap-4 absolute p-4 w-full min-w-[300px] max-h-[300px] left-0 -bottom-4 translate-y-full bg-[#ffffff50] rounded border border-zinc-500 border-solid backdrop-blur'>
                <div className='border border-solid border-zinc-500 py-2 px-4 w-full flex items-center'>
                    <input
                    autoFocus
                    value={studentsSearchText}
                    onChange={({ target:{ value } }) => setStudentsSearchText(value)}
                    placeholder='Find student...'
                    className='focus:outline-none flex-1 bg-transparent'
                    />
                    <VscSearch />
                </div>

                <div className='w-full flex-1 flex flex-col gap-4 text-base overflow-scroll'>
                    {studentsFilterList.map(s => <motion.div
                    key={s.name}
                    className='hover:bg-[#00000010] p-2 rounded flex items-center justify-between'
                    >{s.name}
                    <div className='flex items-center gap-1'>
                        <button
                        onClick={() => { setSelectedStudent(s); setView('result') }} 
                        className='bg-blue-800 rounded shadow-lg text-white p-2'>VIEW</button>
                        <button
                        onClick={() => { setStudentInEdit(s) ; setView('edit student') }} 
                        className='bg-blue-800 rounded shadow-lg text-white p-2'>EDIT</button>
                        <button 
                        onClick={() => { deleteStudent(s.id , s.name); setDropDown('') }}
                        className='bg-blue-800 rounded shadow-lg text-white p-2'>DELETE</button>
                    </div>
                    </motion.div>)}
                </div>
            </motion.div>
            }

            {
            dropDown === 'classes' && 

            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} 
            className='flex flex-col gap-4 absolute p-4 w-full min-w-[300px] max-h-[300px] left-0 -bottom-4 translate-y-full bg-[#ffffff50] rounded border border-zinc-500 border-solid backdrop-blur'>
                <div className='border border-solid border-zinc-500 py-2 px-4 w-full flex items-center'>
                    <input
                    autoFocus
                    value={classSearchText}
                    onChange={({ target }) => setClassSearchText(target.value)}
                    placeholder='Find class...'
                    className='focus:outline-none flex-1 bg-transparent'
                    />
                    <VscSearch />
                </div>

                <div className='w-full flex-1 flex flex-col gap-4 text-base overflow-scroll'>
                    {classFilterList.map(s => <motion.p
                    key={s.name}
                    onClick={() => { setCurrentClass(s); setDropDown('')}}
                    className='hover:bg-[#00000010] p-2 rounded flex items-center justify-between'
                    >{s.name} 
                    <button 
                    onClick={() => { deleteClass(s.name); setDropDown('') }}
                    className='bg-blue-800 rounded shadow-lg text-white p-2'>DELETE</button>
                    </motion.p>)}
                </div>
            </motion.div>
            }
            
        </div>

        <h1 className='text-3xl'>{currentClass.name}</h1>

        <div className='rounded-full border border-solid border-zinc-500 py-2 px-4 shadow-lg w-max flex items-center relative'>
            
            <div
            onClick={() => setSortListOpen(true)} 
            className='flex items-center gap-2'>
                <small>Sort by</small>
                <VscSortPrecedence />
                <small>:</small>

                <small>{sortBy}</small>
            </div>

            {sortListOpen &&

            <div className='absolute p-4 w-full left-0 -bottom-4 translate-y-full bg-[#ffffff50] rounded border border-zinc-500 border-solid backdrop-blur'>
                
                <div>
                    <input 
                    onChange={({ target: { checked } }) => { if(checked) setSortBy('TOTAL'); setSortListOpen(false) }}
                    checked={sortBy == 'TOTAL'} type="radio" name="class" id="1" className='peer hidden'/>
                    <label htmlFor="1" className='peer-checked:text-blue-800 peer-checked:bg-blue-100 mb-4 transition-all block w-full rounded p-2'>
                        <h4>TOTAL</h4>
                    </label>
                </div>


                <div>
                    <input
                    onChange={({ target: { checked } }) => { if(checked) setSortBy('NAMES'); setSortListOpen(false) }}
                    checked={sortBy == 'NAMES'} type="radio" name="class" id="2" className='peer hidden'/>
                    <label htmlFor="2" className='peer-checked:text-blue-800 peer-checked:bg-blue-100 transition-all block w-full rounded p-2'>
                        <h4>NAMES</h4>
                    </label>
                </div>
            </div>
            }
        </div>


        {/* <div>
            <input type="radio" name="class" id="1" className='peer hidden'/>
            <label htmlFor="1" className='peer-checked:text-blue-800 peer-checked:bg-blue-100 transition-all block w-full rounded p-2'>
                <h4>JSS3</h4>
            </label>
        </div>     */}
    </div>
  )
}
