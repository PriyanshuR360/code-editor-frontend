import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('print("Hello, World!")');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const runCode = async () => {
    try {
      const response = await axios.post('https://code-editor-backend-w19r.onrender.com/run', {
        code: code,
        input: input,
        language: 'python'
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput('❌ Failed to connect to backend.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🧠 Code Editor</h1>

      <label style={styles.label}>💻 Python Code:</label>
      <CodeMirror
        value={code}
        height="200px"
        extensions={[python()]}
        onChange={(value) => setCode(value)}
      />

      <label style={styles.label}>📥 Input:</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={styles.inputBox}
        placeholder="Type your input here"
      />

      <button style={styles.button} onClick={runCode}>
        🚀 Run Code
      </button>

      <h3 style={styles.label}>📤 Output:</h3>
      <pre style={styles.outputBox}>{output}</pre>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '30px auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    fontFamily: 'Arial',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  label: {
    marginTop: '20px',
    fontWeight: 'bold',
    color: '#444',
  },
  inputBox: {
    width: '100%',
    height: '80px',
    padding: '10px',
    fontSize: '14px',
    marginTop: '5px',
  },
  button: {
    marginTop: '15px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  outputBox: {
    marginTop: '10px',
    backgroundColor: '#1e1e1e',
    color: '#00ff87',
    padding: '15px',
    borderRadius: '5px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
  },
};

export default App;
