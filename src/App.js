import React from 'react';
import { initializeApp } from 'firebase/app';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './pages/Posts';
import Auth from './pages/Auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC3Jb5Ui5FSlX7DXlbqZlKQTVkhLojU22k',
  authDomain: 'blog-3c8e0.firebaseapp.com',
  projectId: 'blog-3c8e0',
  storageBucket: 'blog-3c8e0.appspot.com',
  messagingSenderId: '921933191666',
  appId: '1:921933191666:web:ded24ee95003e7e38af36b',
  measurementId: 'G-C3BD5QRR32',
  databaseURL: 'https://blog-3c8e0-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/posts' element={<Posts />} />
      </Routes>
    </Router>
  );
}
