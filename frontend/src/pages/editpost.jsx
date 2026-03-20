import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    content: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setForm({
          title: res.data.title,
          subtitle: res.data.subtitle,
          content: res.data.content,
        });
      } catch (err) {
        console.error('Edit post fetch error:', err);
        setError('Failed to load post.');
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`/posts/${id}`, form);
      alert('Post updated successfully.');
      navigate(`/post/${id}`);
    } catch (err) {
      console.error('Edit post submit error:', err);
      setError('Failed to update post');
    }
  };

  return (
    <div className="auth-container">
      <h2>Edit Blog Post</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
        />

        <textarea
          name="content"
          placeholder="Write your markdown content here..."
          value={form.content}
          onChange={handleChange}
          required
          rows="6"
        />

        <h4>🪄 Preview:</h4>
        <ReactMarkdown>{form.content}</ReactMarkdown>


        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
