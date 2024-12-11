// src/components/CommunityChat.js
import React, { useEffect, useState, useRef } from 'react';
import { auth, database } from '../firebase/config';
import { ref, onValue, push } from 'firebase/database';
import './CommunityChat.css';
// Update the import path to node_modules
import '@fortawesome/fontawesome-free/css/all.css'; 
const CommunityChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userEducationLevel, setUserEducationLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!auth.currentUser) return;
    
    try {
      const userRef = ref(database, `users/${auth.currentUser.uid}`);
      const unsubscribeUser = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (!data?.educationLevel) {
          setError("Education level not found");
          return;
        }
        setUserEducationLevel(data.educationLevel);
      });

      return () => unsubscribeUser();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const messagesRef = ref(database, `messages/${userEducationLevel}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setMessages(messageList);
      }
    });
  }, [userEducationLevel]);

  useEffect(() => {
    const membersRef = ref(database, `members/${userEducationLevel}`);
    onValue(membersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const memberList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setMembers(memberList);
      }
    });
  }, [userEducationLevel]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messagesRef = ref(database, `messages/${userEducationLevel}`);
    push(messagesRef, {
      text: newMessage,
      userId: auth.currentUser.uid,
      username: auth.currentUser.email,
      timestamp: Date.now()
    });

    setNewMessage('');
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userEducationLevel) return <div>Education level not set</div>;

  const getColorFromUserId = (userId) => {
    const colors = [
      '#FF6B6B', // coral red
      '#4ECDC4', // turquoise
      '#45B7D1', // sky blue
      '#96CEB4', // sage green
      '#FFEEAD', // cream yellow
      '#D4A5A5', // dusty rose
      '#9B59B6', // purple
      '#3498DB', // blue
      '#E67E22', // orange
      '#2ECC71', // emerald
      '#FF9F43', // tangerine
      '#00B894', // mint
      '#74B9FF', // soft blue
      '#6C5CE7', // violet
      '#FDA7DF', // pink
    ];
    
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>{userEducationLevel} Community</h2>
        <div className="header-icons">
          <a 
            href="https://meet.google.com/eak-wvzu-amf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="video-call-icon"
          >
            <i className="fas fa-video"></i>
          </a>
          <div className="profile-icon" onClick={togglePopup}>
            <i className="fas fa-user"></i>
          </div>
        </div>
      </div>
      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`message ${message.userId === auth.currentUser.uid ? 'own-message' : ''}`}
          >
            <div className="message-header">
              <span 
                className="username" 
                style={{ color: getColorFromUserId(message.userId) }}
              >
                {message.username}
              </span>
              <span className="timestamp">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="message-content">{message.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="submit-button-text">
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default CommunityChat;