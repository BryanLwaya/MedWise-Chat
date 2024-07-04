import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Chat from '../components/Chat'

function Home() {
  return (
    
    <div className='flex h-screen w-full'>
        <Sidebar />
        <div className='flex flex-col flex-1'>
            <Header title={"Diabetes Symptoms"}/>
            <Chat />
        </div>
    </div>
  )
}

export default Home