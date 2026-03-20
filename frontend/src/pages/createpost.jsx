import React, { useState, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authcontext';

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    content: '',
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setError('You must be logged in to post.');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('subtitle', form.subtitle);
    formData.append('content', form.content);
    if (image) formData.append('image', image);

    try {
      await axios.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting post');
    }
  };

  return (
    <div className="auth-container">
      <h2>Create New Blog Post</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
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


        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;
