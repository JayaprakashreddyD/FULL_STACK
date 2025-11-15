import React, { useState } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; 

function SimplePostForm() {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
          userId: 1, 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Success! Post ID: ${data.id}. Title: "${data.title}"`);
        setFormData({ title: '', body: '' }); 
      } else {
        setMessage(`Error: Failed to submit post (Status: ${response.status})`);
      }
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Create New Post</h3>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            rows="5"
            style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Submitting...' : 'Submit Post'}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '15px', padding: '10px', border: `1px solid ${message.startsWith('Success') ? 'green' : 'red'}`, borderRadius: '4px', color: message.startsWith('Success') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default SimplePostForm;