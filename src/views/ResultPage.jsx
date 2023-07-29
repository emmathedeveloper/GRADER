import React, { useContext, useEffect } from 'react'
import { Context } from '../datasource/Provider'
import GraderAPI from '../datasource/GraderAPI'
import AffectiveReport from '../components/AffectiveReport'
import logo from '../assets/images/logo.png'

export default function ResultPage() {

  const { selectedStudent , currentStudents , currentClass , setView } = useContext(Context)

  function handlePress(e){
    if(e.key == 'b' && e.ctrlKey) setView('home')
  }

  useEffect(() => {
     window.addEventListener('keydown' , handlePress)

     return () => window.removeEventListener('keydown' , handlePress)
  } , [])

  return (
    <div className='h-full w-full text-sm p-2 bg-blue-200 text-blue-900'>
      <header className='w-full text-center flex items-center justify-between'>

        <img src={logo} alt="" className='h-[100px] w-[100px] sepia-[100%] hue-rotate-[190deg] saturate-[500%]'/>

        <div>
            <h1>DIVINE TOUCH ROYAL INSTITUTE</h1>
            <p>1, AKPO-OTOR STREET, OREROKPE,</p>
            <p>DELTA STATE, NIGERIA</p>
            <small>Motto: Service to Humanity in the Fear of God.</small>
        </div>

        <div></div>
      </header>

      <div className='w-full grid grid-cols-4 gap-4 p-2 mt-4'>
        <div className='field'>
            <small>NAME: </small>
            <small className=''>{selectedStudent.name}</small>
        </div>
        <div className='field'>
            <small>SEX: </small>
            <small className=''></small>
        </div>
        <div className='field'>
            <small>AGE: </small>
            <small className=''></small>
        </div>
        <div className='field'>
            <small>CLASS: </small>
            <small className=''>{currentClass.name}</small>
        </div>
        <div className='field'>
            <small>OUTSTANDING DEBT: </small>
            <small className=''></small>
        </div>
        <div className='field'>
            <small>NEXT TERM FEES: </small>
            <small className=''></small>
        </div>
        <div className='field'>
            <small>RESUMPTION DATE: </small>
            <small className=''></small>
        </div>
        <div className='field'>
            <small>NO. OF TIMES SCHOOL OPENED: </small>
            <small className=''></small>
        </div>
        <div className='field'>
            <small>NO. OF TIMES PRESENT: </small>
            <small className=''></small>
        </div>
        <div className='field'>
            <small>NO. OF TIMES ABSENT: </small>
            <small className=''></small>
        </div>
        <div className='w-full grid grid-cols-2 gap-2'>
            <div className='field'>
                <small>TERM: </small>
                <small className=''></small>
            </div>
            <div className='field'>
                <small>SESSION: </small>
                <small className=''></small>
            </div>
        </div>
        <div className='w-full grid grid-cols-2 gap-2'>
            <div className='field'>
                <small className='block'>POSITION: </small>
                <small className='text-center block'>{GraderAPI.GET_SINGLE_STUDENT_POSITION(currentStudents , selectedStudent.name)}</small>
            </div>
            <div className='field'>
                <small>OUT OF: </small>
                <small className=''>{currentStudents.length}</small>
            </div>
        </div>
      </div>

      <div className='w-full border border-blue-700'>  
        <div className='w-full'>
            <div className='w-full flex items-center border-b border-blue-700 gap-2'>
                <div className='border-r h-full flex-[.2] flex justify-center'>
                    <small>S/N</small>
                </div>
                <div className='border-r flex-1  h-full'>
                    <small>SUBJECTS</small>  
                </div>
                <div className='border-r  flex-[.5]'>
                    <small>1ST TEST (20%)</small>  
                </div>
                <div className='border-r  flex-[.5]'>
                    <small>2ND TEST (20%)</small> 
                </div>
                <div className='border-r  flex-[.5]'>
                    <small>EXAM (60%)</small> 
                </div>
                <div className='border-r  flex-[.5]'>
                    <small>TOTAL (100%)</small> 
                </div>
                <div className='border-r  flex-[.5]'>
                    <small>CLASS POSITION</small> 
                </div>
                <div className='flex-[.5] border-r'>
                    <small>TEACHER'S REMARK</small> 
                </div>
                <div className='flex-[.5]'>
                    <small>TEACHER'S SIGNATURE</small>
                </div>
            </div>
        </div>

        {selectedStudent.subjects?.map((s , i) => ( s.offering ?

            <div key={i} className='w-full min-h-[30px]'>
                <div className='w-full h-full flex items-center border-b border-blue-700 gap-2'>
                    <div className='border-r border-transparent flex-[.2] flex justify-center'>
                        <small>{i + 1}</small>
                    </div>
                    <div className='flex-1 '>
                        <small>{s.name}</small>  
                    </div>
                    <div className='flex-[.5]'>
                        <small>{s.firstTest}</small>  
                    </div>
                    <div className='flex-[.5]'>
                        <small>{s.secondTest}</small> 
                    </div>
                    <div className='flex-[.5]'>
                        <small>{s.exam}</small> 
                    </div>
                    <div className='flex-[.5]'>
                        <small>{s.firstTest + s.secondTest + s.exam}</small> 
                    </div>
                    <div className='h-full flex-[.5]'>
                        <small>{GraderAPI.GET_SINGLE_SUBJECT_POSITION(s.firstTest + s.secondTest + s.exam , currentStudents , s.name)}</small> 
                    </div>
                    <div className='h-full flex-[.5]'>
                        <small></small> 
                    </div>
                    <div className='flex-[.5]'>
                        <small></small>
                    </div>
                </div>
            </div> : null
        ))}
      </div>

      <div className='w-full grid-cols-2 grid gap-2 mt-4'>
        <div className='field justify-center'>
            <small>TOTAL:  {GraderAPI.COMPUTE_TOTAL(selectedStudent)}</small>
        </div>
        <div className='field justify-center'>
            <small>AVERAGE:  {GraderAPI.COMPUTE_AVERAGE(selectedStudent)}</small>
        </div>
      </div>

      <div className='w-full mt-4 flex flex-col gap-2'>
            <h1>AFFECTIVE REPORT</h1>
            <small>KEY TO RATING : 5 - Excellent , 4 - Good , 3 - Average , 2 - Below Average - , 1 - Poor </small>
            <div className='w-full flex items-center gap-4'>
                <AffectiveReport virtues={[ 'BEHAVIOUR' , 'SCHOOL ATTENDANCE' , 'ATTENDANCE IN CLASS' , 'WORK HABIT' , 'RESPECT FOR AUTHORITY' ]} />
                <AffectiveReport virtues={[ 'BEHAVIOUR' , 'PUNCTUALITY' , 'CLASS ATTENDANCE' , 'PERSONAL HYGIENE' , 'ATTITUDE TO AUTHORITY' ]} />
            </div>
      </div>

      <div className='w-full mt-4 flex flex-col gap-2'>
         <div className='w-full flex flex-col gap-3'>
            <small className='block border-b border-solid border-blue-700 w-full'>CLASS TEACHER'S REMARK :</small>
            <small className='block border-b border-solid border-blue-700 w-full'></small>
            <small className='block border-b border-solid border-blue-700 w-full'>CLASS TEACHER'S NAME :</small>
            <div className='flex gap-2'>
                <small className='block border-b border-solid border-blue-700 w-full flex-1'>SIGNATURE :</small>
                <small className='block border-b border-solid border-blue-700 w-full flex-1'>DATE :</small>
            </div>
         </div>

         <div className='w-full flex flex-col gap-3'>
            <small className='block border-b border-solid border-blue-700 w-full'>PRINCIPAL'S REMARK :</small>
            <small className='block border-b border-solid border-blue-700 w-full'></small>
            <small className='block border-b border-solid border-blue-700 w-full'>PRINCIPAL'S NAME :</small>
            <div className='flex gap-2'>
                <small className='block border-b border-solid border-blue-700 w-full flex-1'>SIGNATURE :</small>
                <small className='block border-b border-solid border-blue-700 w-full flex-1'>DATE :</small>
            </div>
         </div>
      </div>
    </div>
  )
}
