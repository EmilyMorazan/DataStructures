import React, { useState } from 'react';
import DataStructures from './DataStructures';
import Algorithms from './Algorithms';
import ExerciseBox from './ExerciseBox';
import SyntaxBox from './SyntaxBox';
import ContextAwareChatbot from './ContextAwareChatbot';
import { FaComments } from 'react-icons/fa';
import './MainPage.css';

const MainPage = () => {
  const [activePage, setActivePage] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatbotContext, setChatbotContext] = useState({});

  const renderPageContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <div className="home-page">
            <div className="welcome-section">
              <h1>Welcome to CodeReady</h1>
              <p className="subtitle">where you can Review programming concepts</p>
              <div className="features-grid">
                <div 
                  className="feature-card clickable"
                  onClick={() => setActivePage('datastructures')}
                >
                  <h3>📚 Data Structures</h3>
                  <p>Learn and visualize fundamental data structures with interactive examples</p>
                  {/* need to change the color of above text to pink */}
                </div>
                <div 
                  className="feature-card clickable"
                  onClick={() => setActivePage('algorithms')}
                >
                  <h3>🔧 Algorithms</h3>
                  <p>Explore sorting, searching, and other essential algorithms</p>
                </div>
                <div 
                  className="feature-card clickable"
                  onClick={() => setActivePage('concepts')}
                >
                  <h3>💡Review Programming Languages </h3>
                  <p>Review important programming concepts and best practices</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'datastructures':
        return <DataStructures onContextChange={setChatbotContext} />;
      case 'algorithms':
        return <Algorithms onContextChange={setChatbotContext} />;
      case 'concepts':
        return (
          <div className="languages-page">
            <h2>🌐 Review Programming Languages</h2>
            <div className="languages-content">
              <p>Explore different programming languages and their resources:</p>
              <div className="content-grid">
                <div className="content-section">
                  <div className="section-header">
                    <h3>📚 Language Resources</h3>
                  </div>
                  <div className="languages-table-container">
                    <table className="languages-table">
                      <thead>
                        <tr>
                          <th>Language</th>
                          <th>Type</th>
                          <th>Resources</th>
                          <th>Documentation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span className="language-name">☕ Java</span></td>
                          <td>Object-Oriented</td>
                          <td>
                            <a href="https://www.oracle.com/java/" target="_blank" rel="noopener noreferrer" className="resource-link">
                              Official Site
                            </a>
                          </td>
                          <td>
                            <a href="https://docs.oracle.com/javase/tutorial/" target="_blank" rel="noopener noreferrer" className="resource-link">
                              Java Tutorials
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td><span className="language-name">🐍 Python</span></td>
                          <td>General Purpose</td>
                          <td>
                            <a href="https://www.python.org/" target="_blank" rel="noopener noreferrer" className="resource-link">
                              Official Site
                            </a>
                          </td>
                          <td>
                            <a href="https://docs.python.org/3/tutorial/" target="_blank" rel="noopener noreferrer" className="resource-link">
                              Python Docs
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td><span className="language-name">⚡ C++</span></td>
                          <td>System Programming</td>
                          <td>
                            <a href="https://isocpp.org/" target="_blank" rel="noopener noreferrer" className="resource-link">
                              ISO C++
                            </a>
                          </td>
                          <td>
                            <a href="https://en.cppreference.com/" target="_blank" rel="noopener noreferrer" className="resource-link">
                              C++ Reference
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td><span className="language-name">🔧 C</span></td>
                          <td>System Programming</td>
                          <td>
                            <a href="https://www.iso.org/standard/74528.html" target="_blank" rel="noopener noreferrer" className="resource-link">
                              ISO C Standard
                            </a>
                          </td>
                          <td>
                            <a href="https://en.cppreference.com/w/c" target="_blank" rel="noopener noreferrer" className="resource-link">
                              C Reference
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td><span className="language-name">🟨 JavaScript</span></td>
                          <td>Web Development</td>
                          <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className="resource-link">
                              MDN Web Docs
                            </a>
                          </td>
                          <td>
                            <a href="https://javascript.info/" target="_blank" rel="noopener noreferrer" className="resource-link">
                              JavaScript.info
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td><span className="language-name">🌐 HTML</span></td>
                          <td>Markup Language</td>
                          <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer" className="resource-link">
                              MDN HTML
                            </a>
                          </td>
                          <td>
                            <a href="https://www.w3schools.com/html/" target="_blank" rel="noopener noreferrer" className="resource-link">
                              W3Schools HTML
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td><span className="language-name">🎨 CSS</span></td>
                          <td>Styling Language</td>
                          <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer" className="resource-link">
                              MDN CSS
                            </a>
                          </td>
                          <td>
                            <a href="https://www.w3schools.com/css/" target="_blank" rel="noopener noreferrer" className="resource-link">
                              W3Schools CSS
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="content-section">
                  <SyntaxBox />
                </div>

                <div className="content-section">
                  <ExerciseBox />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-page">
      <header className="main-header">
        <h1>CodeReady</h1>
        <p>Review programming concepts</p>
      </header>

      <nav className="main-navigation">
        <button 
          className={activePage === 'home' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActivePage('home')}
        >
          🏠 Home
        </button>
        <button 
          className={activePage === 'datastructures' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActivePage('datastructures')}
        >
          📚 Data Structures
        </button>
        <button 
          className={activePage === 'algorithms' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActivePage('algorithms')}
        >
          🔧 Algorithms
        </button>
        <button 
          className={activePage === 'concepts' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActivePage('concepts')}
        >
          💡 Review Programming Languages
        </button>
      </nav>

      <main className="main-content">
        {renderPageContent()}
      </main>

      {/* Chat UI */}
      <div className="chat-interface">
        {/* Floating Chat Button */}
        <button 
          className={`chat-fab ${isChatOpen ? 'hidden' : ''}`}
          onClick={() => setIsChatOpen(true)}
          aria-label="Open chat"
          title="Open chat with AI tutor"
        >
          <FaComments className="chat-fab-icon" />
        </button>

        {/* Chat Window */}
        <div className={`floating-chatbot-container ${!isChatOpen ? 'hidden' : ''}`}>
          <ContextAwareChatbot 
            context={{
              pageType: activePage,
              ...chatbotContext
            }}
            onMinimize={() => setIsChatOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
