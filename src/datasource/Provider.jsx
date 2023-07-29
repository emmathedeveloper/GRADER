import { createContext, useEffect, useState } from "react";
import GraderAPI from "./GraderAPI";

export const Context = createContext()



export function Provider({children}){

    const [ view , setView ] = useState('no class')

    const [ classes , setClasses ] = useState([])

    const [ currentClass , setCurrentClass ] = useState({})

    const [ students , setStudents ] = useState([])

    const [ currentStudents , setCurrentStudents ] = useState([])

    const [ table , setTable ] = useState({})

    const [ sortBy , setSortBy ] = useState('TOTAL')

    const [ selectedStudent , setSelectedStudent ] = useState({})

    const [ studentInEdit , setStudentInEdit ] = useState({})

    function addClass(name , subjects){
        GraderAPI.ADD_CLASS(name , subjects)
    }

    function editStudent(name , subjects){
        GraderAPI.UPDATE_STUDENT(name , subjects , studentInEdit)

        GraderAPI.UPDATE_CLASS(currentClass)

        setStudentInEdit({})
    }

    async function deleteStudent(id){
        GraderAPI.GET_DATABASE().remove('students' , id)
    }
    
    async function deleteClass(name){
        GraderAPI.GET_DATABASE().remove('classes' , name)
    }
    
    function addStudent(name , record){
        GraderAPI.ADD_STUDENT(name , currentClass.name , record)

        GraderAPI.UPDATE_CLASS(currentClass)
    }

    useEffect(() => {
        document.oncontextmenu = e => e.preventDefault()
    } , [])

    useEffect(() => {

        if(!currentClass.name) return
        
        GraderAPI.GET_STUDENTS((data) => {

            const sorted = data.sort((a , b) => GraderAPI.COMPUTE_TOTAL(a) - GraderAPI.COMPUTE_TOTAL(b))
            
            setStudents(sorted)
            
            setCurrentStudents([...sorted.filter(s => s.level == currentClass.name)])
    
            setTable(GraderAPI.PREPARE_BROADSHEET_TABLE(sorted.filter(s => s.level == currentClass.name) , currentClass))
        })
    } , [currentClass])

    function sortStudents(students){
        
        let sorted = []

        switch (sortBy) {
            case 'TOTAL':
                sorted = students.sort((a , b) => GraderAPI.COMPUTE_TOTAL(b) - GraderAPI.COMPUTE_TOTAL(a))  
                break;
                
                case 'NAMES':
                    sorted = students.sort((a , b) => b.name - a.name)     
                break;

                default:
                break;
        }

        setTable(GraderAPI.PREPARE_BROADSHEET_TABLE(sorted , currentClass))

        return sorted
    }
    
    useEffect(() => {
        
        if(!currentClass.name) return

        setCurrentStudents(sortStudents([...students.filter(s => s.level == currentClass.name)]))
        
        setTable(GraderAPI.PREPARE_BROADSHEET_TABLE(sortStudents([...students.filter(s => s.level == currentClass.name)]) , currentClass))
        
    } , [students])

    useEffect(() => {
        
        
        GraderAPI.GET_CLASSES((data) => {
            
            const sorted = data.sort((a , b) => b.updatedAt - a.updatedAt)
            
            setClasses(sorted)
            
            setCurrentClass(sorted[0] || {})
            
            sorted.length ? setView('home') : setView('no class')
        })
        
        GraderAPI.SUBSCRIBE('classes' , (data) => {
            
            const sorted = data.sort((a , b) => b.updatedAt - a.updatedAt)
            
            setClasses(sorted)
            
            setCurrentClass(sorted[0] || {})
            
            sorted.length ? setView('home') : setView('no class')
        })
        
        
        GraderAPI.SUBSCRIBE('students' , (data) => {
            
            const sorted = data.sort((a , b) => a.updatedAt - b.updatedAt)
            
            setStudents(sorted)
            
            setTable(GraderAPI.PREPARE_BROADSHEET_TABLE(sorted.filter(s => s.level == currentClass.name) , currentClass))
        })
        
    } , [])

    useEffect(() => {

        if(!currentClass.name) return
        
        setCurrentStudents(sortStudents(students.filter(s => s.level == currentClass.name)))

        setTable(GraderAPI.PREPARE_BROADSHEET_TABLE(sortStudents([...students.filter(s => s.level == currentClass.name)]) , currentClass))
        
    } , [sortBy])
    
    return <Context.Provider value={{ 
        view,
        setView,
        addClass,
        addStudent,
        classes,
        currentClass,
        setCurrentClass,
        currentStudents,
        table,
        sortBy,
        setSortBy,
        selectedStudent,
        setSelectedStudent,
        studentInEdit,
        setStudentInEdit,
        editStudent,
        deleteStudent,
        deleteClass
    }}>
        {children}
    </Context.Provider>
}