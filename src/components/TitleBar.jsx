import React from 'react'
import { appWindow } from '@tauri-apps/api/window'
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc'

export default function TitleBar({ title = '' }) {

  async function minimizeWindow(){
    await appWindow.minimize()
  }

  async function toggleWindow(){
    await appWindow.toggleMaximize()
  }

  async function closeWindow(){
    await appWindow.close()
  }

  return (
    <div data-tauri-drag-region className='bg-white shadow-lg w-full h-[30px] flex items-center justify-between fixed px-1 py-2 top-0 left-0 z-10 '>
      <small>{title}</small>

      <div className='flex items-center gap-8 text-zinc-900 h-full text-lg'>
        <VscChromeMinimize
        onClick={minimizeWindow}
        className='hover:bg-zinc-200' 
        />
        <VscChromeMaximize
        onClick={toggleWindow}
        className='hover:bg-zinc-200' 
        />
        <VscChromeClose 
        onClick={closeWindow}
        className='hover:bg-zinc-200' 
        />
      </div>
    </div>
  )
}
