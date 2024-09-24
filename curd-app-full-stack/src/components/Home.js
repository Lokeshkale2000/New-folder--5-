import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure this CSS file exists and is updated

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1); 
  const postsPerPage = 4; 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://new-folder-5-rouge.vercel.app/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts. Please try again later.');
      } finally {
        setLoading(false); 
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://new-folder-5-rouge.vercel.app/api/posts/${id}`);
      console.log(response.data); 
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post. Please try again later.');
    }
  };

  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); 
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p>Loading posts...</p>; 
  }

  return (
    <div className="home">
      <h3 className="PostTitle">All Posts</h3>
      {error && <p className="error-message">{error}</p>}
      <ul className="post-list">
        {currentPosts.map(post => (  
          <li key={post._id} className="post-item">
            <div className="post-content">
              <h5>Title: {post.title}</h5>
              <p>Content: {post.content}</p>
              <div >
                {post.image && <img src={post.image} alt={post.title} style={{ width: '360px',height:'260px', marginTop: '10px',}}className='image-container' />} {/* Display image if available */}
              </div>
            </div>
            <p>By: {post.author}</p>
            <div className="post-actions">
              <Link to={`/edit-post/${post._id}`} className="edit-btn">Edit</Link>
              <button onClick={() => handleDelete(post._id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

     
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1} className="page-btn">
          Previous
        </button>
        <span className="page-info">Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="page-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
