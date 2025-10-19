import React, { useState } from 'react';
import DataStructures from './DataStructures';
import './MainPage.css';

const MainPage = () => {
  const [activePage, setActivePage] = useState('home');

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
                  <h3>💡 Concepts</h3>
                  <p>Review important programming concepts and best practices</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'datastructures':
        return <DataStructures />;
      case 'algorithms':
        return (
          <div className="algorithms-page">
            <h2>🔧 Algorithms</h2>
            <div className="coming-soon">
              <h3>Coming Soon!</h3>
              <p>This section will contain interactive algorithm visualizations and explanations.</p>
              <div className="placeholder-content">
                <div className="algorithm-card">
                  <h4>Sorting Algorithms</h4>
                  <p>Bubble Sort, Quick Sort, Merge Sort, and more...</p>
                </div>
                <div className="algorithm-card">
                  <h4>Searching Algorithms</h4>
                  <p>Linear Search, Binary Search, and more...</p>
                </div>
                <div className="algorithm-card">
                  <h4>Graph Algorithms</h4>
                  <p>DFS, BFS, Dijkstra's Algorithm, and more...</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'concepts':
        return (
          <div className="concepts-page">
            <h2>💡 Programming Concepts</h2>
            <div className="coming-soon">
              <h3>Coming Soon!</h3>
              <p>This section will contain explanations of important programming concepts.</p>
              <div className="placeholder-content">
                <div className="concept-card">
                  <h4>Object-Oriented Programming</h4>
                  <p>Classes, Objects, Inheritance, Polymorphism...</p>
                </div>
                <div className="concept-card">
                  <h4>Functional Programming</h4>
                  <p>Pure Functions, Immutability, Higher-Order Functions...</p>
                </div>
                <div className="concept-card">
                  <h4>Design Patterns</h4>
                  <p>Singleton, Factory, Observer, and more...</p>
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
          💡 Concepts
        </button>
      </nav>

      <main className="main-content">
        {renderPageContent()}
      </main>
    </div>
  );
};

export default MainPage;
