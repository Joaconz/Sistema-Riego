import React from 'react'
import { Toast } from 'react-bootstrap'

export const Alert = ({message}) => {
  return (
    <div className='bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded relative mb-2 text-center'>
        <h2>{message}</h2>
    </div>
  )
}
