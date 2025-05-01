import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:8000/analyze/', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div className="App">
      <h1>Jenkins Log Analyzer Chatbot (Stage 1)</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload and Analyze</button>
      <pre>{result}</pre>
    </div>
  );
}

export default App;
