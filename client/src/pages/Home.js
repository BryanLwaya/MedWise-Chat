import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Chat from '../components/Chat'

const Home = () => {
  const [chatId, setChatId] = useState(null);

  return (
    
    <div className='flex h-screen'>
        <Sidebar setChatId={setChatId} />
        <div className='flex flex-grow flex-col flex-1 overflow-y-auto'>
            <Header title={"MEDWISE CHAT"}/>
            <Chat chatId={chatId}/>
        </div>
    </div>
  )
}

export default Home