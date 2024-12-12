import React, { useState, useContext, useEffect } from 'react';
import './ChatBot.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';

const ChatBot = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [surveyData, setSurveyData] = useState(null);

  

  // Initialize Gemini model inside component
  const genAI = new GoogleGenerativeAI("AIzaSyDlgO4qmQKWYiUbk90Cgy70k_Ubo6fJHtk");
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
  });

  // Fetch survey data on component mount
  useEffect(() => {
    const fetchUserSurvey = async () => {
      if (!user) return;
      try {
        const surveyDoc = await getDoc(doc(db, 'userSurveys', user.uid));
        if (surveyDoc.exists()) {
          setSurveyData(surveyDoc.data());
        }
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };
    fetchUserSurvey();
  }, [user]);

  const detectQuestionType = (input) => {
    const mathPattern = /[0-9+\-*/^=()%√π]/;
    const scienceKeywords = /(physics|chemistry|biology|experiment|reaction|force|energy)/i;
    const languageKeywords = /(grammar|syntax|spelling|write|essay|paragraph)/i;
    
    if (mathPattern.test(input)) return 'math';
    if (scienceKeywords.test(input)) return 'science';
    if (languageKeywords.test(input)) return 'languages';
    return 'general';
  };

  // Update prepareAcademicContext to include survey data
  const prepareAcademicContext = (question) => {
    const questionType = detectQuestionType(question);
    let context = `You are an AI tutor and counselor. User's profile:
      - Education Level: ${surveyData?.answers?.educationLevel || 'Unknown'}
      - Academic Performance: ${surveyData?.answers?.academicPerformance || 'Unknown'}
      - Stress Level: ${surveyData?.answers?.stressLevel || 'Unknown'}
      - Support Needed: ${surveyData?.answers?.supportNeeded || 'Unknown'}

      Based on this profile and that this is a ${questionType} question, provide:
      1. A personalized response considering their education level
      2. Clear step-by-step solutions if it's an academic question
      3. Emotional support and study tips when relevant
      4. Examples and analogies appropriate for their level

      Question: ${question}
      Please provide a detailed, supportive response.`;
    
    return context;
  };

  // Enhance the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');

    try {
      // Check if survey data is available
      if (!surveyData) {
        const surveyDoc = await getDoc(doc(db, 'surveys', user.uid));
        if (surveyDoc.exists()) {
          setSurveyData(surveyDoc.data());
        }
      }

      const context = prepareAcademicContext(inputMessage);
      const result = await model.generateContent(context);
      const response = await result.response;
      const botMessage = {
        text: response.text(),
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [...prevMessages, {
        text: 'Sorry, I had trouble processing your request. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
    }
  };

  return (
    <div className="chatbotContainermain">
      <div className="chatbotContainer">
          <div className="chatbot-container">
          <div className="chat-header">
            <h2>AI Assistant</h2>
          </div>
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="i-container"
            />
            <button type="submit" className="submit-button">Send</button>
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default ChatBot;