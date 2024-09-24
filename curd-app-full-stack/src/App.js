import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Corrected import path
import BlogPostForm from './components/BlogPostForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import EditPost from './components/EditPost'; 

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/home" element={<Home />} /> 
          <Route path="/BlogPostForm" element={<BlogPostForm />} /> 
          <Route path="/edit-post/:id" element={<EditPost />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
