// src/components/ChatMessage.js
import React from 'react';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`p-3 rounded-lg max-w-4/5 ${isUser ? 'bg-[#cff1ff] text-black w-fit' : 'bg-gray-100 text-black w-4/5'}`}>
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
