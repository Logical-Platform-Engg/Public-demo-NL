import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './smartchat.css';

const SmartChat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [error, setError] = useState(null);
    const textareaRef = useRef(null);

    const handleSend = async () => {
        if (!message.trim()) return;

        const userMessage = { sender: 'user', text: message, time: new Date().toLocaleTimeString() };

        // Add only the user message to the chat
        setChat([...chat, userMessage]);
        setMessage('');  // Clear the input after sending the message
        setError(null);  // Reset error state

        try {
            // Send the message to the API and wait for a response
            const response = await axios.post('http://localhost:5000/api/chat', { message });
            const aiMessage = { sender: 'ai', text: response.data.response, time: new Date().toLocaleTimeString() };

            // Only add the AI message to the chat after receiving the response
            setChat(prevChat => [...prevChat, aiMessage]);
        } catch (error) {
            console.error('Error:', error);
            setError('Error communicating with the AI. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto'; // Reset height to auto to shrink when text is removed
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    };

    useEffect(() => {
        adjustTextareaHeight(); // Adjust height on initial render
    }, []);

  return (
    <div>
      <h1>SmartChat</h1>
      <div className="chatbot-container">
            <div className="chatbox">
                {chat.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                        <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
                        <span className="timestamp">{msg.time}</span>
                    </div>
                ))}
                {error && <div className="error-message">{error}</div>}
            </div>
            <div className="input-container">
                <textarea
                    ref={textareaRef} // Attach ref to adjust height dynamically
                    value={message}
                    onChange={handleInputChange}
                    rows="1" // Start with one visible row
                    className="chat-input"
                    placeholder="Type your message..."
                />
                <button onClick={handleSend} className="send-button">Send</button>
            </div>
        </div>
    </div>
  );
};

export default SmartChat;
