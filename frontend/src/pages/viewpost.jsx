import React, { useEffect, useState, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/authcontext';

const ViewPost = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error('View post error:', err);
      setError('Could not load the post.');
    }
  };

  const handleDelete = async () => {
    if (!globalThis.confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`/posts/${post._id}`);
      alert('Post deleted');
      navigate('/');
    } catch (err) {
      console.error('Delete request failed:', err);
      alert('Failed to delete post');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    const text = commentText.trim();
    if (!text) return;

    try {
      await axios.post(`/posts/${post._id}/comments`, { text });
      setCommentText('');
      fetchPost();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add comment');
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!post) return <p>Loading post...</p>;

  return (
    <div className="post-container">
      <h2>{post.title}</h2>
      <h4>{post.subtitle}</h4>

      {post.imageUrl && (
        <img src={post.imageUrl} alt="blog" className="post-image" />
      )}

      <div className="post-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <h3>💬 Comments</h3>

      {post.comments?.length > 0 ? (
        <ul>
          {post.comments.map((c, i) => (
            <li key={`${c.username}-${c.createdAt || i}`}>
              <strong>{c.username}</strong>: {c.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}

      {user && (
        <form onSubmit={handleComment} style={{ marginTop: '10px' }}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
            style={{ padding: '8px', width: '70%', marginRight: '8px' }}
          />
          <button type="submit">Post</button>
        </form>
      )}

      <small>
        Posted by <strong>{post.author?.username}</strong> on{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </small>

      {user?.username === post.author?.username && (
        <div className="post-actions">
          <Link to={`/edit/${post._id}`}>✏️ Edit</Link>
          <button className="delete-btn" onClick={handleDelete}>
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
