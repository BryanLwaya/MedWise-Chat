import React, { useState, useRef, useEffect } from 'react';

const ResizableTextArea = ({ value, onChange, maxHeight }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to calculate the scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set height based on the scrollHeight with a maximum cap
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`;
    }
  }, [value, maxHeight]);

  return (
    <textarea
      ref={textareaRef}
      placeholder='Ask me anything...'
      value={value}
      onChange={onChange}
      className="w-full p-3 border-2 border-gray-400 rounded-md overflow-y-auto bg-gray-100 h-20 active:border-gray-500 resize-none"
      style={{ maxHeight: `${maxHeight}px` }}
      rows={1}
    />
  );
};

export default ResizableTextArea;
