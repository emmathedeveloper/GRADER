import React from 'react'
import { motion } from 'framer-motion'

export default function Modal({ open }) {
  return (
    <motion.div 
    exit={{ translateX: '-50px' , opacity: 0 }} 
    className='h-full w-full absolute z-10 bg-[#00000027] grid place-items-center p-4'>
      { children }
    </motion.div>
  )
}
