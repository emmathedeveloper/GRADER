import WebBase from "./WebBase"


const database = new WebBase({
    name: 'grader',
    stores:[
        {
            name: 'classes',
            key: 'name'
        },
        {
            name: 'students',
            key: 'id'
        },
    ]
})

export default class GraderAPI{

    static GET_DEFAULT_SUBJECTS(){

        return [
            'ENGLISH STUDIES',
            'MATHEMATICS',
            'MATHEMATICS (NUMERICS)',
            'BASIC SCIENCE AND TECHNOLOGY',
            'CHRISTIAN RELIGIOUS STUDIES', 
            'BUSINESS STUDIES',
            'CULTURAL AND CREATIVE ARTS',
            'PRE-VOCATIONAL STUDIES',
            'NATIONAL VALUES',
            'HISTORY',
            'URHOBO LANGUAGE',
            'FRENCH',
            'PHYSICS',
            'CHEMISTRY',
            'BIOLOGY',
            'GEOGRAPHY',
            'MARKETING',
            'COMMERCE',
            'GOVERNMENT',
            'AGRICULTURAL SCIENCE',
            'QUANTITATIVE REASONING',
            'VERBAL REASONING',
            'COMPUTER SCIENCE',
            'HOME ECONOMICS',
            'P.H.E',
            'CIVIC EDUCATION',
            'HAND WRITING',
            'LITERATURE',
            'ECONOMICS',
            'SOCIAL STUDIES',
            'MUSIC',
            'RHYMES',
            'HEALTH SCIENCE',
            'CREATIVE ARTS',
            'GENERAL SCIENCE',
        ]
    }

    static COMPUTE_TOTAL(student){
        const total = student.subjects?.reduce((t , sub) => {
            if(!sub.offering) return t

            return t + sub.firstTest + sub.secondTest + sub.exam
        } , 0)

        return total
    }

    static PREPARE_BROADSHEET_TABLE(students , currentClass){
        const bucket = {}

        currentClass.subjects?.forEach(s => {

            const water = []

            students.forEach(stud => {
                let found = stud.subjects.find(sub => sub.name == s)

                water.push(found.offering ? found.firstTest + found.secondTest + found.exam : 'N/A')
            })

            bucket[s] = water

        })


        return bucket
    }

    static GET_STUDENT_TOTAL(students){
        return students.map(s => GraderAPI.COMPUTE_TOTAL(s))
    }

    static GET_STUDENT_AVERAGE(students){
        return students.map(s => GraderAPI.COMPUTE_AVERAGE(s))
    }

    static GET_CLASS_POSITION(students){
        const totals = this.GET_STUDENT_TOTAL(students).sort((a , b) => b - a)

        const positions = []

        students.forEach(stud => {
            positions.push(this.GET_SUFFIX(totals.indexOf(this.COMPUTE_TOTAL(stud)) + 1))
        })

        return positions
    }

    static GET_SINGLE_STUDENT_POSITION(students , name){
        const totals = this.GET_STUDENT_TOTAL(students).sort((a , b) => b - a)

        const positions = []

        students.forEach(stud => {
            stud.name == name ? positions.push(this.GET_SUFFIX(totals.indexOf(this.COMPUTE_TOTAL(stud)) + 1)) : null
        })

        return positions[0]
    }

    static GET_SUBJECT_POSITIONS(scoresOriginal){

        if(!scoresOriginal) return

        
        let positions = []
        
        const scores = [...scoresOriginal]
        
        let sorted = [...scores.sort((a , b) => b - a)]
        
        scoresOriginal.forEach(s => s === 'N/A' ? positions.push('N/A') : positions.push(sorted.indexOf(s) + 1))

        positions = positions.map(p => GraderAPI.GET_SUFFIX(p))

        return positions
    }

    static COMPUTE_AVERAGE(student){

        let i = 0

        const total = student.subjects?.reduce((t , sub) => {
            if(!sub.offering) return t

            i += 1

            return t + sub.firstTest + sub.secondTest + sub.exam
        } , 0)

        return  (total / i).toFixed(2)
    }

    static GET_SUFFIX(num){

        if(num === 'N/A') return num

        const exemptions = ['11' , '12' , '13']

        const string = num.toString()

        if(exemptions.includes(string.slice(string.length - 2 , string.length))) return num + 'TH'

        if(string.endsWith('1')){
            return num + 'ST'
        }else if(string.endsWith('2')){    
            return num + 'ND'
        }else if(string.endsWith('3')){
            return num + 'RD'
        }else{
            return num + 'TH'
        }
    }

    static GET_STUDENTS(callback){

        database.getAll('students' , callback)
    }

    static GET_CLASSES(callback){
        
        database.getAll('classes' , callback)
    }

    static GET_SINGLE_SUBJECT_POSITION(score , students , subject){
        
        let scores = []

        students.forEach(stud => {
            scores.push(stud.subjects)

            scores = scores.flat().filter(s => s.name === subject)
        })

        scores = scores.map(s => s.firstTest + s.secondTest + s.exam).sort((a , b) => b - a)

        console.log(scores);

        const position = this.GET_SUFFIX(scores.indexOf(score) + 1)

        return position
    }

    static SUBSCRIBE(store , callback){
        database.trackStore(store , callback)
    }

    static ADD_STUDENT(name , level , record){

        database.add('students' , {
            id: new Date().getTime(),
            name,
            level,
            subjects: record,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        })
    }

    static ADD_CLASS(name , subjects){

        database.add('classes' , {
            name,
            subjects,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        })
    }
    
    static UPDATE_CLASS(newClass){
        database.add('classes' , {
            ...newClass,
            updatedAt: new Date().getTime()
        })

    }

    static UPDATE_STUDENT(name , subjects , student){
        database.add('students' , {
            ...student,
            subjects,
            name,
            updatedAt: new Date().getTime()
        })
    }

    static GET_DATABASE(){

        return database
    }
}