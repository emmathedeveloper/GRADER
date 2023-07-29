import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Context } from '../datasource/Provider'
import Switch from '../components/Switch'

export default function EditStudentView() {

  const { studentInEdit , editStudent , setView } = useContext(Context)

  const [ name , setName ] = useState(studentInEdit.name)

  const [ subjects , setSubjects ] = useState(studentInEdit.subjects)


  function setOffering(value , subject){
        const copy = subjects

        let found = copy.find(s => s.name == subject)

        found.offering = value

        setSubjects([...copy])
  }

  function updateFirst(subject , value){
        const copy = subjects

        let found = copy.find(s => s.name == subject)

        found.firstTest = parseInt(value)

        setSubjects([...copy])
  }

  function updateSecond(subject , value){
        const copy = subjects

        let found = copy.find(s => s.name == subject)

        found.secondTest = parseInt(value)

        setSubjects([...copy])
  }

  function updateExam(subject , value){
        const copy = subjects

        let found = copy.find(s => s.name == subject)

        found.exam = parseInt(value)

        setSubjects([...copy])
  }

  return (
    <motion.div 
    initial={{ translateX: '-50px' , opacity: 0 }} 
    animate={{ translateX: 0 , opacity: 1 }}
    className='h-full w-full flex items-center justify-center flex-col p-2 gap-2 text-xs'>
      
      <div className='bg-white rounded flex gap-4 p-2 w-full shadow-lg border border-zinc-500'>
        <input
        autoFocus
        placeholder='Name, e.g ; JOHN DOE' 
        value={name}
        onChange={({ target }) => setName(target.value.toUpperCase())}
        className='rounded focus:outline-none focus:border-blue-800 border-zinc-500 border-2 p-2 w-full'
        />

        <button 
        onClick={() => {
            setView('home')
        }}
        className='px-4 py-2 rounded bg-blue-800 text-white'>
            CANCEL
        </button>

        <button 
        disabled={!name.trim()}
        onClick={() => {
            editStudent(name , subjects),
            setView('home')
        }}
        className='px-4 py-2 rounded bg-blue-800 text-white disabled:bg-zinc-500'>
            DONE
        </button>
      </div>

      <div className='grid grid-cols-3 gap-4 w-full'>
        {subjects.map(subject => (
            <div key={subject.name} className={`bg-white border border-zinc-500 rounded p-2 shadow-lg ${subject.offering ? 'opacity-100' : 'opacity-50'}`}>
                <div className='flex items-center justify-between px-2 w-full mb-4'>
                    <h1>{subject.name}</h1>
                    <Switch offering={subject.offering} id={subject.name} setOffering={setOffering}/>
                </div>

                {subject.offering && 
                    <div className='flex items-center gap-2 w-full'>
                        <input 
                        value={subject.firstTest.toString()}
                        onBlur={({ target: { value } }) => !value.trim() ? updateFirst(subject.name , 0) : null}
                        onChange={({ target }) => updateFirst(subject.name , target.value)}
                        className='flex-1 p-2 w-1/3' type="number" placeholder='1ST TEST'/>
                        
                        <input 
                        value={subject.secondTest.toString()}
                        onBlur={({ target: { value } }) => !value.trim() ? updateSecond(subject.name , 0) : null}
                        onChange={({ target }) => updateSecond(subject.name , target.value)}
                        className='flex-1 p-2 w-1/3' type="number" placeholder='2ND TEST'/>
                        
                        <input 
                        value={subject.exam.toString()}
                        onBlur={({ target: { value } }) => !value.trim() ? updateExam(subject.name , 0) : null}
                        onChange={({ target }) => updateExam(subject.name , target.value)}
                        className='flex-1 p-2 w-1/3' type="number" placeholder='EXAM'/>
                    </div>
                }
                
            </div>
        ))}
      </div>
    </motion.div>
  )
}
