// Configuration for Groq API
// This file is imported directly by the application

const config = {
  groq: {
    apiKey: process.env.REACT_APP_GROQ_API_KEY || '',
    model: 'llama-3.3-70b-versatile',
    apiUrl: 'https://api.groq.com/openai/v1/chat/completions'
  }
};

export default config;
