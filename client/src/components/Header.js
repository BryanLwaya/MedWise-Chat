import React from 'react'

function Header({
  title,
}) {
  return (
    <div className='title p-4 border-b-2 border-primary w-full'>
      <h1 className='text-xl text-primary font-bold ml-2'>{title}</h1>
    </div>
  )
}

export default Header