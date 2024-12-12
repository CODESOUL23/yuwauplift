// src/firebase/initializeVideos.js
import { db } from './config';
import { collection, 
  getDocs, 
  writeBatch, 
  doc , addDoc } from 'firebase/firestore';

const videoData = [
  {
    title: "Overcome Academic Stress",
    url: "https://www.youtube.com/watch?v=c1aQZh5Q_YE",
    thumbnail: "https://img.youtube.com/vi/c1aQZh5Q_YE/maxresdefault.jpg"
  },
  {
    title: "Study Motivation", 
    url: "https://www.youtube.com/watch?v=RF5_wuZvJ88",
    thumbnail: "https://img.youtube.com/vi/RF5_wuZvJ88/maxresdefault.jpg"
  },
  {
    title: "Academic Excellence",
    url: "https://www.youtube.com/watch?v=3QRLyoYXgLY",
    thumbnail: "https://img.youtube.com/vi/3QRLyoYXgLY/maxresdefault.jpg"
  }
];

export const initializeVideosCollection = async () => {
  try {
    const videosRef = collection(db, 'motivationalVideos');
    
    // Check if videos already exist to avoid duplicates
    const querySnapshot = await getDocs(videosRef);
    if (!querySnapshot.empty) {
      console.log('Videos collection already initialized');
      return;
    }
    
    // Add each video document
    const batch = writeBatch(db);
    videoData.forEach((video) => {
      const docRef = doc(videosRef);
      batch.set(docRef, {
        ...video,
        createdAt: new Date()
      });
    });
    
    await batch.commit();
    console.log('Videos collection initialized successfully');
  } catch (error) {
    console.error('Error initializing videos:', error);
  }
};