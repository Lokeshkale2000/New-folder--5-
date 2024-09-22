import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Corrected import path
import BlogPostForm from './components/BlogPostForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import EditPost from './components/EditPost'; // Import for the new edit page

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/home" element={<Home />} /> {/* Set the homepage to "/" */}
          <Route path="/BlogPostForm" element={<BlogPostForm />} /> {/* Add post page */}
          <Route path="/edit-post/:id" element={<EditPost />} /> {/* Edit post with ID */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
