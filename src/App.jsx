import React, { useContext } from 'react'
import AppView from './components/AppView'
import NoClasses from './views/NoClasses'
import AddClass from './views/AddClass'
import Home from './views/Home'
import { Context } from './datasource/Provider'
import AddStudent from './views/AddStudent'
import ResultPage from './views/ResultPage'
import EditStudentView from './views/EditStudentView'
import BroadSheet from './views/BroadSheet'

export default function App() {

  const { view } = useContext(Context)

  return (
    <div className='h-[100vh] w-[100vw] flex items-center flex-col select-none'>
      <AppView>
        {view === 'no class' && <NoClasses />}
        {view === 'add class' && <AddClass />}
        {view === 'home' && <Home />}
        {view === 'add student' && <AddStudent />}
        {view === 'result' && <ResultPage />}
        {view === 'edit student' && <EditStudentView />}
        {view === 'broad sheet' && <BroadSheet />}
      </AppView>
    </div>
  )
}
