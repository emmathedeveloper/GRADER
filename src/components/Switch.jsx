import React from 'react'

export default function Switch({ id , offering , setOffering }) {
  return (
    <div className='w-[20px] h-[20px] rounded-full border border-zinc-500'>
      <input checked={offering} className='hidden peer' onChange={({ target }) => setOffering(target.checked , id)} type="checkbox" name="check" id={id} />

      <label htmlFor={id} className='block h-full w-full rounded-full peer-checked:bg-blue-800 cursor-pointer'></label>
    </div>
  )
}
