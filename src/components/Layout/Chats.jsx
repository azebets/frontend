import React, { useState, useEffect, useRef, useContext } from 'react';
import SocketService from '../../services/socketService';
import { AuthContext } from '../../context/AuthContext';
import {serverUrl} from "../../utils/api"

export default function Chats({ closeChat }) {
  const { user } = useContext(AuthContext);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isEmojiDropdownOpen, setIsEmojiDropdownOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(0); // Track the number of online users
  const chatContainerRef = useRef(null);
  const maxCharacters = 200;

  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian'];
  const emojis = ['😀', '😂', '😍', '😎', '👍', '🎉', '❤️'];

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const toggleEmojiDropdown = () => {
    setIsEmojiDropdownOpen(!isEmojiDropdownOpen);
  };

  const toggleRulesModal = () => {
    setIsRulesModalOpen(!isRulesModalOpen);
  };

  const handleInputChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setChatInput(e.target.value);
    }
  };

  const addEmojiToInput = (emoji) => {
    if (chatInput.length + emoji.length <= maxCharacters) {
      setChatInput(chatInput + emoji);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      const message = {
        username: user?.username, // Replace with the actual username
        content: chatInput,
        icon: '👤', // Replace with the user's icon
      };

      // Send the message to the backend
      SocketService.sendMessage('send_message', message);

      // Clear the input field
      setChatInput('');

      // Scroll to the bottom to show the new message
      setTimeout(scrollToBottom, 100);
    }
  };

  useEffect(() => {
    // Connect to the backend socket server
    SocketService.connect(serverUrl()); // Replace with your backend URL

    // Load previous messages
    SocketService.onMessage('load_previous_messages', (messages) => {
      setChatMessages(messages);
      setTimeout(scrollToBottom, 100); // Scroll to the bottom after loading messages
    });

    // Listen for incoming messages
    SocketService.onMessage('receive_message', (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
      setTimeout(scrollToBottom, 100); // Scroll to the bottom when a new message is received
    });

    // Listen for active user count
    SocketService.onMessage('active_users', (count) => {
      setOnlineUsers(count); // Update the online user count
    });

    // Cleanup on component unmount
    return () => {
      SocketService.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-y-0 right-0 w-[370px] bg-[#0f212e] text-white shadow-lg z-30 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 h-15 bg-[rgb(15,33,46)] shadow-[0_4px_6px_-1px_#0000007a]">
        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={toggleLanguageDropdown}
            className="flex items-center space-x-2 text-sm font-medium hover:text-blue-500"
          >
            <span>{selectedLanguage}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transform transition-transform ${
                isLanguageDropdownOpen ? 'rotate-180' : 'rotate-0'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isLanguageDropdownOpen && (
            <div className="absolute mt-2 bg-[#1a2c38] border border-gray-700 rounded shadow-lg w-32 z-40">
              <ul className="py-1">
                {languages.map((language, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedLanguage(language)}
                    className="px-4 py-2 text-sm hover:bg-blue-600 cursor-pointer"
                  >
                    {language}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Close Icon */}
        <button
          onClick={closeChat}
          className="hover:rotate-90 transition-transform duration-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white hover:text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Chat Content */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar"
      >
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 bg-[#1a2c38] p-3 rounded shadow"
          >
            {/* User Icon */}
            <div className="text-2xl">{message.icon}</div>
            {/* Chat Content */}
            <div>
              <p className="text-sm font-bold">{message.username}:</p>
              <p className="text-sm text-gray-300">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-[#1a2c38] border-t border-gray-700 space-y-2">
        {/* Input Section */}
        <div className="relative bg-[rgb(15,33,46)] shadow border-[rgb(47,69,83)] border-3 rounded p-2">
          <textarea
            value={chatInput}
            onChange={handleInputChange}
            placeholder="Type your message"
            className="w-full px-1 py-1 text-sm text-white bg-transparent rounded focus:outline-none resize-none break-words"
            rows="1"
          />
          <button
            onClick={toggleEmojiDropdown}
            className="absolute right-2 top-2 text-lg hover:text-blue-500"
          >
            😊
          </button>
          {isEmojiDropdownOpen && (
            <div className="absolute bottom-12 right-0 bg-[#1a2c38] border border-gray-700 rounded shadow-lg p-2 z-40">
              <div className="flex space-x-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => addEmojiToInput(emoji)}
                    className="text-lg hover:bg-blue-600 rounded p-1"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-green-600 rounded-[50%]"></span>
            <span className="text-[#b1bad3] bold">Online: {onlineUsers}</span>
          </div>

          <div className="flex items-center space-x-4">
            <span>{maxCharacters - chatInput.length}</span>
            <button
              onClick={toggleRulesModal}
              className="text-blue-500 hover:underline"
            >
              Rules
            </button>
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
