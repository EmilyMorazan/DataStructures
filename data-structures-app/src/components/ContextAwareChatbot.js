import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaMinus, FaPaperPlane } from 'react-icons/fa';
import './ContextAwareChatbot.css';
import groqService from '../services/groqService';


const ContextAwareChatbot = ({ context = {}, onMinimize }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getWelcomeMessage = useCallback(() => {
    const { pageType, dataStructure, algorithm, concept } = context;
    
    if (pageType === 'datastructures' && dataStructure) {
      return `👋 Hi! I'm your AI tutor. I see you're working with **${dataStructure}**. Ask me anything about operations, complexity, or use cases!`;
    } else if (pageType === 'algorithms' && algorithm) {
      return `👋 Hello! I can help you understand the **${algorithm}** algorithm. Feel free to ask about how it works, its complexity, or when to use it!`;
    } else if (pageType === 'concepts' && concept) {
      return `👋 Hey there! Ready to explore **${concept}**? Ask me anything to deepen your understanding!`;
    }
    return `👋 Hi! I'm your AI tutor powered by Groq Llama. I'm here to help you understand data structures, algorithms, and programming concepts. What would you like to learn?`;
  }, [context]);

  // Initialize with welcome message based on context
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = getWelcomeMessage();
      setMessages([
        {
          role: 'assistant',
          content: welcomeMessage,
          timestamp: new Date()
        }
      ]);
    }
  }, [context.pageType, messages.length, getWelcomeMessage]);

  const buildContextualSystemPrompt = () => {
    const { pageType, dataStructure, algorithm, concept, operation, state } = context;
    
    let systemPrompt = `You are an expert computer science tutor helping students learn interactively. 
Provide clear, concise explanations suitable for beginners to intermediate learners. 
Use examples, analogies, and step-by-step reasoning where helpful.
Keep responses under 200 words unless the student asks for more detail.
Be encouraging and supportive.`;

    if (pageType === 'datastructures' && dataStructure) {
      systemPrompt += `\n\nThe student is currently working with a ${dataStructure}.`;
      if (operation) {
        systemPrompt += ` They just performed or are trying to perform: ${operation}.`;
      }
      if (state) {
        systemPrompt += ` Current state: ${JSON.stringify(state)}`;
      }
    } else if (pageType === 'algorithms' && algorithm) {
      systemPrompt += `\n\nThe student is learning about the ${algorithm} algorithm.`;
      if (state) {
        systemPrompt += ` Current visualization state: ${JSON.stringify(state)}`;
      }
    } else if (pageType === 'concepts' && concept) {
      systemPrompt += `\n\nThe student is exploring the concept: ${concept}.`;
    }

    return systemPrompt;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Check if API is configured
    if (!groqService.isConfigured()) {
      setError('⚠️ Groq API key not configured. Please add your API key to .env.local');
      return;
    }

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Build conversation history for context
      const conversationHistory = [
        {
          role: 'system',
          content: buildContextualSystemPrompt()
        },
        ...messages.slice(-6).map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        {
          role: 'user',
          content: userMessage.content
        }
      ];

      const response = await groqService.chat(conversationHistory, {
        temperature: 0.7,
        maxTokens: 800
      });

      const assistantMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(`❌ Error: ${err.message}`);
      
      // Add error message to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I'm sorry, I encountered an error: ${err.message}. Please try again.`,
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    const welcomeMessage = getWelcomeMessage();
    setMessages([
      {
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date()
      }
    ]);
    setError(null);
  };

  const getQuickActions = () => {
    const { pageType, dataStructure, algorithm, operation } = context;
    
    const actions = [];

    if (pageType === 'datastructures' && dataStructure) {
      actions.push(
        `Explain ${dataStructure} in simple terms`,
        `What's the time complexity?`,
        `Show me a real-world example`,
        `Common mistakes to avoid?`
      );
      if (operation) {
        actions.push(`Why did my ${operation} operation work this way?`);
      }
    } else if (pageType === 'algorithms' && algorithm) {
      actions.push(
        `How does ${algorithm} work?`,
        `What's the best/worst case?`,
        `Compare with other sorting algorithms`,
        `When should I use this?`
      );
    }

    return actions.slice(0, 4);
  };

  const handleQuickAction = (action) => {
    setInput(action);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-custom-header">
        <div className="chatbot-title">
          <span>💬 AI Tutor</span>
        </div>
        <div className="chatbot-controls">
          <button 
            className="chat-control-btn minimize-btn"
            onClick={onMinimize}
            aria-label="Minimize chat"
            title="Minimize chat"
          >
            <FaMinus />
          </button>
        </div>
      </div>
      <div className="chatbot-messages" ref={chatContainerRef}>
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`message ${msg.role} ${msg.isError ? 'error' : ''}`}
          >
            <div className="message-content">
              {msg.content.split('\n').map((line, i) => (
                <p key={i}>{formatMessage(line)}</p>
              ))}
            </div>
            <div className="message-timestamp">
              {msg.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant loading">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="chatbot-error">
          {error}
        </div>
      )}

      {getQuickActions().length > 0 && messages.length <= 1 && (
        <div className="quick-actions">
          {getQuickActions().map((action, idx) => (
            <button
              key={idx}
              className="quick-action-btn"
              onClick={() => handleQuickAction(action)}
            >
              {action}
            </button>
          ))}
        </div>
      )}

      <div className="chatbot-input-container">
        <textarea
          className="chatbot-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          rows="2"
          disabled={isLoading}
          aria-label="Chat input"
        />
        <button 
          className="chatbot-send-btn"
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          {isLoading ? (
            <div className="loading-spinner-small"></div>
          ) : (
            <FaPaperPlane />
          )}
        </button>
      </div>
    </div>
  );
};

// Format message text (handle bold markdown)
const formatMessage = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export default ContextAwareChatbot;
