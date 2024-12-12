import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Add Navigate here
import './App.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Survey from './components/Survey';
import ChatBot from './components/ChatBot';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import CommunityChat from './components/CommunityChat';
import MotivationalVideos from './components/MotivationalVideos';
import { initializeVideosCollection } from './firebase/initializeVideos';
import { useEffect } from 'react';
import TherapyPage from './components/TherapyPage';
import Educational from './components/Educational';
import FirstPage from './components/FirstPage'; // Rename firstpage.js to FirstPage.js
import Sponsor from './components/Sponsor'; 
import Organization from './components/organisation';
import Dashboard from './components/dashboard';
import Contact from './components/ContactUs';
import Scholarship from './components/Scholarship';

function App() {
  useEffect(() => {
    initializeVideosCollection();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<FirstPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sponsor" element={<Sponsor />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />  
              </PrivateRoute>
            } />
            <Route path="/survey" element={<PrivateRoute><Survey /></PrivateRoute>} />
            <Route path="/chat" element={<PrivateRoute><ChatBot /></PrivateRoute>} />
            <Route path="/community" element={<PrivateRoute><CommunityChat /></PrivateRoute>} />
            <Route path="/motivation" element={<PrivateRoute><MotivationalVideos /></PrivateRoute>} />
            <Route path="/therapy" element={<PrivateRoute><TherapyPage /></PrivateRoute>} />
            <Route path="/educational" element={<PrivateRoute><Educational /></PrivateRoute>} />
            <Route path="/organization" element={<PrivateRoute><Organization /></PrivateRoute>} />
            <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
            <Route path="/scholarship" element={<PrivateRoute><Scholarship /></PrivateRoute>} />
            
            {/* Catch all redirect to FirstPage */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
