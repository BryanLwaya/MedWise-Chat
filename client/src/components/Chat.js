import React, { useState, useEffect, useRef } from 'react';
import ResizableTextArea from './ResizableTextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ChatMessage from './ChatMessage';
import axios from 'axios';

const Chat = ({ chatId, setChatId }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_chats');
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    if (chatId) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get('http://localhost:5000/get_messages', {
            params: { chat_id: chatId }
          });
          const fetchedMessages = response.data.map(msg => ({
            text: msg.message,
            isUser: msg.sender !== 'bot'
          }));
          setMessages(fetchedMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSend = async (event) => {
    if (event) event.preventDefault();
    if (input.trim() && chatId) {
      const newMessage = { text: input, isUser: true };
      setMessages([...messages, newMessage]);
      setInput('');
  
      setLoading(true);
  
      try {        
          const response = await axios.post('http://localhost:5000/send_message', {
            chat_id: chatId,
            message: input,
            sender: 'user'
          });
          const botReply = { text: response.data.reply, isUser: false };
          setMessages((prevMessages) => [...prevMessages, botReply]);
          setLoading(false);
      } catch (error) {
        console.error('Error sending message to the backend:', error);
        setLoading(false); 
      }
    }
  };
  

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSend(event);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        {chatId ? (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
              ))}
              {loading && (
                <div className="flex justify-start mb-4">
                <div className="p-3 rounded-lg max-w-4/5 text-black overflow-auto bg-gray-100 max-w-4/5">
                    <div className="spinner"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="sticky bottom-0 bg-white p-4 flex items-center">
              <form onSubmit={handleSend} className="flex-grow flex items-center">
                <div className="flex-grow">
                  <ResizableTextArea
                    value={input}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    maxHeight={150} // Maximum height of 150px for the textarea
                  />
                </div>
                <button
                  type="submit"
                  className="ml-2 p-2 bg-primary text-white rounded-full flex justify-center items-center active:bg-gray-500 size-11 text-xl"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-4 bg-blue-100 border border-blue-300 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Welcome to MedWise Chat!</h2>
              <p className="text-lg">Select a chat or start a new one to begin.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
