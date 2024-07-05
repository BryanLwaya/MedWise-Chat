// src/components/ChatMessage.js
import React from 'react';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`p-3 rounded-lg max-w-4/5 text-black overflow-auto ${isUser ? 'bg-[#cff1ff] w-1/2' : 'bg-gray-100 max-w-4/5'}`} style={{ wordBreak: 'break-word' }}>
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
