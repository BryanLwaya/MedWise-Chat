import React, { useState, useEffect } from 'react';
import "../css/sidebar.css";
import logo from "../icons/MedWise Bot.png";
import edit_png from "../icons/edit-3-svgrepo-com.svg";
import logout_png from "../icons/logout-svgrepo-com.svg";
import profile from "../icons/profile.png";
import axios from 'axios';

const Sidebar = ({ setChatId }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_chats');
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chat titles:', error);
      }
    };

    fetchChats();
  }, []);


  const createChat = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create_chat', {
        title: 'Chat with Doctor'
      });
      setChatId(response.data.chat_id);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <div className="flex flex-col w-1/5 h-screen bg-primary text-white sticky">
      {/* LOGO */}
      <div className="sidebar-header flex items-center justify-center">
        <img src={logo} alt="" className="w-24 h-24" />
      </div>

      <div className='sidebar-content p-4 overflow-y-auto flex-1 scroll-p-2'>
        {/* NEW CHAT */}
        <div
          className="new-chat bg-secondary rounded p-2 mb-4 active:bg-highlight cursor-pointer"
          onClick={createChat}
        >
          <div className='flex items-center gap-2 ml-2'>
            <img src={edit_png} alt="edit" className="h-7 w-7 " />
            <p className='font-semibold text-primary'>New Chat</p>
          </div>
        </div>

        {/* Chat History */}
        {chats.map(chat => (
          <div
            key={chat._id}
            className="chat-item p-2 mb-2 bg-highlight rounded cursor-pointer"
            onClick={() => setChatId(chat._id)}
          >
            {chat.title}
          </div>
        ))}
      </div>

      {/* FOOTER   */}
      <div className='sidebar-footer flex flex-col bg-primary pt-1'>
        <div className="divider h-[1px] w-4/5 bg-white self-center"></div>

        <div className="mb-2 mt-1 w-full">
          <a href="#" className="flex text-sm hover:bg-highlight items-center gap-2 w-4/5 ml-4 p-2 rounded active:bg-primary">
            <img src={logout_png} alt="logout" className='h-7 w-7' />
            Logout
          </a>
        </div>
        <div className="flex items-center h-20 bg-highlight mx-2 rounded-md mb-2 px-4 gap-x-4">
          <img src={profile} alt="user" className='h-10 w-10' />
          <div className="text-left">
            <p className="text-[13pt] font-semibold -mb-1">John Doe</p>
            <p className="text-xs">johndoe@gmail.com</p>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Sidebar;
