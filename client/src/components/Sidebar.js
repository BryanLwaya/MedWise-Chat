import React from 'react';
import "../css/sidebar.css";
import logo from "../icons/MedWise Bot.png";
import edit_png from "../icons/edit-3-svgrepo-com.svg";
import logout_png from "../icons/logout-svgrepo-com.svg";
import profile from "../icons/profile.png";

function Sidebar() {
  return (
    <div className="flex flex-col w-1/5 h-screen bg-primary text-white">
      {/* LOGO */}
      <div className="sidebar-header flex items-center justify-center">
        <img src={logo} alt="" className="w-24 h-24" />
      </div>

      <div className='sidebar-content p-4 overflow-y-auto'>
        {/* NEW CHAT */}
        <div className="new-chat bg-secondary rounded p-2 mb-4 active:bg-highlight">
          <div className='flex items-center gap-2 ml-2'>
            <img src={edit_png} alt="edit" className="h-7 w-7 " />
            <p className='font-semibold text-primary'>New Chat</p>
          </div>
        </div>

        {/* HISTORY SECTION */}
        <div>
          <ul>
            <li className="mb-3">
              <a href="#" className="flex items-center p-2 hover:bg-highlight rounded">
                <span className="ml-2">Diabetes Symptoms</span>
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="flex items-center p-2 hover:bg-highlight rounded">
                <span className="ml-2">High blood pressure prevention measures</span>
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="flex items-center p-2 hover:bg-highlight rounded">
                <span className="ml-2">Diabetes best practices</span>
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="flex items-center p-2 hover:bg-highlight rounded">
                <span className="ml-2">Health advice</span>
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="flex items-center p-2 hover:bg-highlight rounded">
                <span className="ml-2">Personal Health Assistance</span>
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="flex items-center p-2 hover:bg-highlight rounded">
                <span className="ml-2">Personal Health Assistance</span>
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="flex items-center p-2 hover:bg-highlight rounded">
                <span className="ml-2">Personal Health Assistance</span>
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="flex items-center p-2 hover:bg-highlight rounded">
                <span className="ml-2">Personal Health Assistance</span>
              </a>
            </li>
          </ul>
        </div>
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
    </div>
  );
}

export default Sidebar;
