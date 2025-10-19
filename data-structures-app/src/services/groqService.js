// Groq AI API Service
// Documentation: https://console.groq.com/docs

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

class GroqService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GROQ_API_KEY;
    this.model = process.env.REACT_APP_GROQ_MODEL || 'llama-3.3-70b-versatile';
  }

  /**
   * Check if API key is configured
   */
  isConfigured() {
    return !!this.apiKey && this.apiKey !== 'your_groq_api_key_here';
  }

  /**
   * Send a chat completion request to Groq
   * @param {Array} messages - Array of message objects with role and content
   * @param {Object} options - Additional options like temperature, max_tokens
   * @returns {Promise<string>} - The AI response
   */
  async chat(messages, options = {}) {
    if (!this.isConfigured()) {
      throw new Error(
        'Groq API key not configured. Please add REACT_APP_GROQ_API_KEY to your .env.local file'
      );
    }

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens || 1024,
          top_p: options.topP || 1,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Groq API request failed');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Groq API Error:', error);
      throw error;
    }
  }

  /**
   * Get help or explanation for a data structure operation
   * @param {string} dataStructure - The data structure type
   * @param {string} operation - The operation performed
   * @param {string} context - Additional context about the user's action
   * @returns {Promise<string>} - AI explanation
   */
  async explainOperation(dataStructure, operation, context = '') {
    const messages = [
      {
        role: 'system',
        content: `You are an expert computer science tutor helping students learn data structures and algorithms. 
        Provide clear, concise explanations suitable for beginners. Use examples and analogies where helpful.
        Keep responses under 150 words unless asked for more detail.`
      },
      {
        role: 'user',
        content: `Explain the ${operation} operation on a ${dataStructure}. ${context ? `Context: ${context}` : ''}`
      }
    ];

    return await this.chat(messages);
  }

  /**
   * Get hints when user is stuck
   * @param {string} dataStructure - The data structure type
   * @param {string} problem - The problem the user is facing
   * @returns {Promise<string>} - AI hint
   */
  async getHint(dataStructure, problem) {
    const messages = [
      {
        role: 'system',
        content: `You are a helpful tutor providing hints, not complete solutions. 
        Guide the student to discover the answer themselves through questions and small clues.`
      },
      {
        role: 'user',
        content: `I'm working with ${dataStructure} and ${problem}. Give me a hint to help me proceed.`
      }
    ];

    return await this.chat(messages);
  }

  /**
   * Analyze user's learning pattern and provide personalized suggestions
   * @param {Object} userActivity - User's activity data
   * @returns {Promise<string>} - Personalized learning path
   */
  async getPersonalizedSuggestions(userActivity) {
    const messages = [
      {
        role: 'system',
        content: `You are an adaptive learning AI that analyzes student behavior and suggests personalized learning paths.
        Focus on areas where the student struggles and recommend exercises to strengthen weak areas.`
      },
      {
        role: 'user',
        content: `Based on this activity: ${JSON.stringify(userActivity)}, suggest what I should focus on next.`
      }
    ];

    return await this.chat(messages);
  }

  /**
   * Explain time and space complexity in simple terms
   * @param {string} algorithm - The algorithm name
   * @param {string} complexity - The complexity notation
   * @returns {Promise<string>} - Simple explanation
   */
  async explainComplexity(algorithm, complexity) {
    const messages = [
      {
        role: 'system',
        content: `You are explaining Big O notation to beginners. Use real-world analogies and simple language.
        Avoid jargon and make it intuitive.`
      },
      {
        role: 'user',
        content: `Why is the time complexity of ${algorithm} ${complexity}? Explain it simply with an analogy.`
      }
    ];

    return await this.chat(messages);
  }

  /**
   * Review and provide feedback on user's understanding
   * @param {string} topic - The topic being reviewed
   * @param {string} userAnswer - User's answer or explanation
   * @returns {Promise<string>} - AI feedback
   */
  async reviewAnswer(topic, userAnswer) {
    const messages = [
      {
        role: 'system',
        content: `You are a patient teacher reviewing student answers. Provide constructive feedback,
        acknowledge what they got right, and gently correct misconceptions.`
      },
      {
        role: 'user',
        content: `Topic: ${topic}\nMy answer: ${userAnswer}\n\nIs this correct? Please review and provide feedback.`
      }
    ];

    return await this.chat(messages);
  }

  /**
   * Generate practice problems based on difficulty level
   * @param {string} dataStructure - The data structure to practice
   * @param {string} difficulty - easy, medium, or hard
   * @returns {Promise<string>} - Practice problem
   */
  async generatePracticeProblem(dataStructure, difficulty = 'medium') {
    const messages = [
      {
        role: 'system',
        content: `You are creating practice problems for data structures. 
        Make them practical and interesting, with clear problem statements.`
      },
      {
        role: 'user',
        content: `Create a ${difficulty} practice problem involving ${dataStructure}. 
        Include the problem statement and expected approach (not full solution).`
      }
    ];

    return await this.chat(messages);
  }
}

// Export singleton instance
const groqService = new GroqService();
export default groqService;
