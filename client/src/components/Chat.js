import React, { useState } from 'react';
import ResizableTextarea from './ResizableTextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ChatMessage from './ChatMessage';

const Chat = () => {
    const [input, setInput] = useState('');

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSend = (event) => {
        event.preventDefault();
        // Handle the send action
        console.log('Message sent:', input);
        setInput('');
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">

                {/* Static chat messages */}
                <ChatMessage
                    message="Hi, can you tell me about high blood pressure prevention measures?"
                    isUser={true}
                />
                <ChatMessage
                    message="Sure! Maintaining a healthy diet, exercising regularly, reducing sodium intake, and managing stress are key measures."
                    isUser={false}
                />
                {/* Add more static messages as needed */}
            </div>

            <div className="p-4 flex items-center">
                <form onSubmit={handleSend} className="flex-grow flex items-center">
                    <div className="flex-grow">
                        <ResizableTextarea
                            value={input}
                            onChange={handleChange}
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
        </div>
    );
};

export default Chat;
