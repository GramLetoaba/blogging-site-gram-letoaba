import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/posts');
      setPosts(res.data);
    } catch (err) {
      setError('Failed to load posts');
    }
  };

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );


  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <h1>📝 All Blog Posts</h1>
      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '8px', width: '100%', marginBottom: '20px' }}
      />


      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <div className="posts-list">
          {filteredPosts.map(post => (
            <Link to={`/post/${post._id}`} key={post._id} className="post-card">
              {post.imageUrl && <img src={post.imageUrl} alt="post" />}
              <h3>{post.title}</h3>
              <p>{post.subtitle}</p>
              <small>By {post.author?.username} | {new Date(post.createdAt).toLocaleDateString()}</small>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
